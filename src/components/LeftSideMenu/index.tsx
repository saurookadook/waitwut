import React, { useContext, useEffect, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { MenuNavLink } from 'components/nav';
import { createNavLinks } from 'components/nav/utils';
import { PageMapContext, StateContext } from 'common/contexts';

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

const LeftSideMenu = (): React.ReactElement => {
    const { group: nodesGroups } = useSheetsQuery();
    const { pageMap } = useContext(PageMapContext);
    const { menu } = useContext(StateContext);

    const [drawerProps, setDrawerProps] = useState<'temporary' | 'permanent'>(
        window.outerWidth > 600 ? 'permanent' : 'temporary',
    );
    const mediaQuery = window.matchMedia('(min-width: 600px)');

    useEffect(() => {
        const onChangeCallback = (event: MediaQueryListEvent): void => {
            setDrawerProps(event.matches ? 'permanent' : 'temporary');
        };

        mediaQuery.addEventListener('change', onChangeCallback);

        return () => {
            mediaQuery.removeEventListener('change', onChangeCallback);
        };
    });

    const navLinks: NavLinkItem[] = createNavLinks({ nodesGroups, pageMap });

    return (
        <ThemeProvider theme={menuTheme}>
            <StyledDrawer
                open={!!menu.drawerVisible}
                variant={drawerProps}
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
