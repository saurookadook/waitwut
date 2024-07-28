import React, { useContext, useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { type PageMap } from 'common/constants/pageMap';
import { PageMapContext, StateContext } from 'common/contexts';
import { MenuNavLink } from 'components/nav';
import { createNavLinks } from 'components/nav/utils';
import { isWindowDefined } from 'utils/index';

import { menuTheme } from 'themes';
import { StyledDrawer } from './styled';

const drawerWidth = 240;
const drawerVariantBreakpoint = 1024;

const LeftSideMenu = (): React.ReactElement => {
    const { allMdx, allMarkdownRemark } = useSheetsQuery();
    const { group: mdxNodesGroups } = allMdx;
    const { group: markdownNodesGroups } = allMarkdownRemark;
    const { pageMap } = useContext(PageMapContext);
    const { menu } = useContext(StateContext);

    const [drawerVariant, setDrawerVariant] = useState<'temporary' | 'permanent'>(
        isWindowDefined() && window.outerWidth > drawerVariantBreakpoint ? 'permanent' : 'temporary',
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
            // const navLinks: NavLinkItem[] = createNavLinks({ nodesGroups, pageMap });
            try {
                const combinedNodesGroups = mergeNodesGroups({
                    args: [mdxNodesGroups, markdownNodesGroups],
                    pageMap: pageMap,
                    target: [],
                });
                const _navLinks = createNavLinks({ nodesGroups: combinedNodesGroups, pageMap });
                setNavLinks(_navLinks);
            } catch (e) {
                console.error(`ERROR encountered while creating navLinks for LeftSideMenu: `, e);
            }
        }
    }, [
        navLinks.length,
        mdxNodesGroups,
        markdownNodesGroups,
        pageMap,
    ]);

    // console.log(' LeftSideMenu - navLinks '.padStart(80, '=').padEnd(160, '='));
    // console.log(JSON.parse(JSON.stringify(navLinks)));
    return (
        <ThemeProvider theme={menuTheme}>
            <StyledDrawer
                open={!!menu.drawerVisible}
                variant={drawerVariant}
                // TODO: add another breakpoint for tablet?
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                {navLinks.map((navLink, index) => (
                    <MenuNavLink depth={0} key={`${index}:${navLink.slug}`} navLink={navLink} />
                ))}
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
    pageMap: PageMap[];
    target: GroupFromQuery[];
    args: GroupFromQuery[][];
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
        // TODO: add logic to get
        target.push({
            fieldValue: key as TopLevelPageSlugs,
            nodes: value,
        });
    }

    return target;
}

export const useSheetsQuery = (): SideMenuData => {
    const { allMdx, allMarkdownRemark } = useStaticQuery(
        graphql`
            query {
                allMdx(sort: { fields: frontmatter___title, order: DESC }) {
                    group(field: frontmatter___sectionSlug) {
                        nodes {
                            fields {
                                pathComponents
                            }
                            frontmatter {
                                title
                                fullPath
                                iconComponentName
                            }
                            id
                            slug
                        }
                        fieldValue
                    }
                }
                allMarkdownRemark(sort: { fields: frontmatter___title, order: DESC }) {
                    group(field: frontmatter___sectionSlug) {
                        nodes {
                            fields {
                                pathComponents
                                slug
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
    return { allMdx, allMarkdownRemark };
};

export default LeftSideMenu;
