import React, { useContext, useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { PageMapContext, StateContext } from 'common/contexts';
import { MenuNavLink } from 'components/nav';
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

const drawerWidth = 240;
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

export default LeftSideMenu;
