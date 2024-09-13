import React, { useContext, useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { type PageMap } from 'common/constants/pageMap';
import { PageMapContext, StateContext } from 'common/contexts';
import { MenuNavLinkGroup } from 'components/nav';
import { createNavLinks } from 'components/nav/utils';
import { isWindowDefined } from 'utils/index';

import { menuTheme } from 'themes';
import { StyledDrawer, StyledAside } from './styled';

const drawerWidth = 320;
const drawerVariantBreakpoint = 1024;

const LeftSideMenu = (): React.ReactElement => {
    const { allMdx, allMarkdownRemark } = useSheetsQuery();
    const { group: mdxNodesGroups } = allMdx;
    const { group: markdownNodesGroups } = allMarkdownRemark;
    const { pageMap } = useContext(PageMapContext);
    const { menu } = useContext(StateContext);

    const [drawerVariant, setDrawerVariant] = useState<'temporary' | 'permanent'>(
        isWindowDefined() && window.outerWidth > drawerVariantBreakpoint
            ? 'permanent'
            : 'temporary',
    );

    const [navLinks, setNavLinks] = useState<NavLinkItem[]>([]);

    let mediaQuery: MediaQueryList | null = null;
    if (isWindowDefined()) {
        mediaQuery = window.matchMedia(`(min-width: ${drawerVariantBreakpoint}px)`);
    }

    useEffect(() => {
        if (mediaQuery != null) {
            const onChangeCallback = (event: MediaQueryListEvent): void => {
                setDrawerVariant(event.matches ? 'permanent' : 'temporary');
            };

            mediaQuery.addEventListener('change', onChangeCallback);

            return () => {
                (mediaQuery as MediaQueryList).removeEventListener('change', onChangeCallback);
            };
        }
    });

    useEffect(() => {
        if (navLinks.length === 0) {
            // TODO: maybe a hook like useMemo would be better for this?
            try {
                const combinedNodesGroups = mergeNodesGroups({
                    args: [mdxNodesGroups, markdownNodesGroups],
                    pageMap: pageMap,
                });
                const _navLinks = createNavLinks({ nodesGroups: combinedNodesGroups, pageMap });
                setNavLinks(_navLinks);
            } catch (e) {
                console.error(`ERROR encountered while creating navLinks for LeftSideMenu: `, e);
                // TODO: set some safe fallback with `setNavLinks`?
            }
        }
    }, [
        navLinks.length,
        mdxNodesGroups,
        markdownNodesGroups,
        pageMap,
    ]);

    return (
        <ThemeProvider theme={menuTheme}>
            <StyledDrawer
                $drawerWidth={drawerWidth}
                id="side-nav-drawer"
                role="complementary"
                open={!!menu.drawerVisible}
                variant={drawerVariant}
            >
                <StyledAside>
                    <nav>
                        <ul>
                            {navLinks.map((navLink, index) => (
                                <MenuNavLinkGroup // force formatting
                                    key={`${index}:${navLink.slug}`}
                                    depth={0}
                                    navLink={navLink}
                                />
                            ))}
                        </ul>
                    </nav>
                </StyledAside>
            </StyledDrawer>
        </ThemeProvider>
    );
};

function findNodesGroupBySectionSlug({
    nodesGroups,
    sectionSlug,
}: {
    nodesGroups: GroupFromQuery[];
    sectionSlug: string;
}): GroupFromQuery | undefined {
    return nodesGroups.find((group) => group.fieldValue === sectionSlug);
}

function mergeNodesGroups({
    args,
    pageMap,
    target = [],
}: {
    args: GroupFromQuery[][];
    pageMap: PageMap[];
    target?: GroupFromQuery[];
}): GroupFromQuery[] {
    const resultsBySectionSlug = {} as DynamicObject<GroupFromQuery['nodes']>;

    for (const nodesGroupsArg of args) {
        for (const pageConfig of pageMap) {
            const pageConfigSlug = pageConfig.sectionSlug;
            const groupBySectionSlug = findNodesGroupBySectionSlug({
                nodesGroups: nodesGroupsArg,
                sectionSlug: pageConfigSlug,
            });

            if (groupBySectionSlug == null) {
                continue;
            }

            if (resultsBySectionSlug[pageConfigSlug] == null) {
                resultsBySectionSlug[pageConfigSlug] = [...groupBySectionSlug.nodes];
            } else {
                resultsBySectionSlug[pageConfigSlug] = resultsBySectionSlug[pageConfigSlug].concat(
                    groupBySectionSlug.nodes,
                );
            }
        }
    }

    for (const [key, value] of Object.entries(resultsBySectionSlug)) {
        target.push({
            fieldValue: key as TopLevelPageSlugs,
            nodes: value,
        });
    }

    return target;
}

export const useSheetsQuery = (): SideMenuData => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    sort: [{ fields: { pathComponents: ASC } }, { fields: { directParent: ASC } }]
                ) {
                    group(field: { frontmatter: { sectionSlug: SELECT } }) {
                        nodes {
                            fields {
                                directParent
                                pathComponents
                                slug
                                topLevelParent
                            }
                            frontmatter {
                                date(formatString: "MMMM D, YYYY")
                                fullPath
                                sectionSlug
                                title
                            }
                        }
                        fieldValue
                    }
                }
            }
        `,
    );
    const allMdx = { group: [], nodes: [] };
    return { allMdx, allMarkdownRemark };
};

export default LeftSideMenu;
