import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import { AppBar, Box, Drawer, Toolbar, Typography } from '@mui/material';

import { appBarTheme, menuTheme } from '../themes';

const StyledAppBar = styled(AppBar)`
    background-color: ${(props) => props?.theme?.backgroundColor} !important;
    color: ${(props) => props.theme?.color} !important;
    z-index: 1000000 !important;
`;

const NavLink = styled(Link)`
    color: ${(props) => props?.theme?.color};
    font-size: 1.5rem;
    margin-left: 12em;
    padding: 0 1em;
    text-align: center;
    text-decoration: none;
`;

const StyledDrawer = styled(Drawer)`
    background-color: ${(props) => props?.theme?.backgroundColor} !important;
    color: ${(props) => props.theme?.color} !important;

    & .MuiDrawer-paper {
        background-color: ${(props) => props?.theme?.backgroundColor} !important;
        border: none;
        color: ${(props) => props.theme?.color} !important;
        padding-top: 6em;
    }
`;

const StyledNavLink = styled(Link)`
    color: ${(props) => props?.theme?.color};
    font-size: 1.5rem;
    padding: 0 1em;
    text-align: left;
    text-decoration: none;
`;

const ChildLinkWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const navLinks: NavLinkItem[] = [
    {
        slug: 'sheet',
        label: 'Sheets',
        children: [],
    },
];

const drawerWidth = 240;

export const useSheetsQuery = () => {
    const { allMdx } = useStaticQuery(
        graphql`
            query {
                allMdx(sort: { fields: frontmatter___title, order: DESC }) {
                    nodes {
                        frontmatter {
                            title
                        }
                        id
                        slug
                    }
                }
            }
        `,
    );
    return allMdx;
};

const MenuNavLink = ({ depth, navLink }: MenuNavLinkArgs): React.ReactElement => (
    <>
        <StyledNavLink to={`/${navLink.slug}`}>{navLink.label}</StyledNavLink>
        {(navLink.children || []).length > 0 ? (
            <ChildLinkWrapper style={{ marginLeft: `${(depth + 1) * 1}em` }}>
                {(navLink.children || []).map((childNavLink, childIndex) => (
                    <MenuNavLink depth={depth + 1} key={`${childIndex}:${navLink.slug}`} navLink={childNavLink} />
                ))}
            </ChildLinkWrapper>
        ) : null}
    </>
);

const Header = ({ data }: HeaderProps) => {
    const theme = useTheme();
    const { nodes } = useSheetsQuery();

    if ((nodes || []).length > 0) {
        navLinks[0].children = (nodes || []).map((node: NodeFromQuery): NavLinkItem => {
            return {
                slug: node.slug,
                label: (node.frontmatter || {}).title || node.slug,
            };
        });
    }

    console.log('---------- data: ', data);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={appBarTheme}>
                    <StyledAppBar>
                        <Toolbar>
                            <Typography variant="h4" component="div">
                                <NavLink to="/">wait, wut?</NavLink>
                            </Typography>
                        </Toolbar>
                    </StyledAppBar>
                    <ThemeProvider theme={menuTheme}>
                        <StyledDrawer
                            variant="permanent"
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
                </ThemeProvider>
            </Box>
        </ThemeProvider>
    );
};

export default Header;
