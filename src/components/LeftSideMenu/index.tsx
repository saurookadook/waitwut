import React, { useContext, useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { PageMapContext, StateContext } from 'common/contexts';
import { MenuNavLinkGroup } from 'components/nav';
import { createNavLinks } from 'components/nav/utils';
import { isWindowDefined } from 'utils/index';

import { menuTheme } from 'themes';
import { StyledDrawer } from './styled';

export const useSheetsQuery = (): MdxNodes => {
    const { allMdx } = useStaticQuery(
        graphql`
            query {
                allMdx(sort: { fields: frontmatter___title, order: DESC }) {
                    group(field: frontmatter___sectionSlug) {
                        nodes {
                            frontmatter {
                                title
                                fullPath
                                iconComponentName
                            }
                            id
                            slug
                            fields {
                                pathComponents
                            }
                        }
                        fieldValue
                    }
                }
            }
        `,
    );
    return allMdx;
};

const drawerWidth = 304;
const drawerVariantBreakpoint = 1024;

const LeftSideMenu = (): React.ReactElement => {
    const { group: nodesGroups } = useSheetsQuery();
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
            setNavLinks(createNavLinks({ nodesGroups, pageMap }));
        }
    }, [
        navLinks.length,
        nodesGroups,
        pageMap,
    ]);

    // console.log(' LeftSideMenu - navLinks '.padStart(80, '=').padEnd(160, '='));
    // console.log(JSON.parse(JSON.stringify(navLinks)));
    return (
        <ThemeProvider theme={menuTheme}>
            <StyledDrawer
                id="side-nav-drawer"
                role="complementary"
                open={!!menu.drawerVisible}
                variant={drawerVariant}
                // TODO: add another breakpoint for tablet?
                $drawerWidth={drawerWidth}
            >
                <aside>
                    {navLinks.map((navLink, index) => (
                        <MenuNavLinkGroup // force formatting
                            key={`${index}:${navLink.slug}`}
                            depth={0}
                            navLink={navLink}
                        />
                    ))}
                </aside>
            </StyledDrawer>
        </ThemeProvider>
    );
};

export default LeftSideMenu;
