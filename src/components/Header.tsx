import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import { AppBar, Box, Drawer, Toolbar, Typography } from '@mui/material';

import { MenuNavLink } from './nav';
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
    background-color: ${(props) => props?.theme?.backgroundColor};
    color: ${(props) => props.theme?.color};

    & > .MuiDrawer-paper {
        background-color: ${(props) => props?.theme?.backgroundColor};
        border: none;
        color: ${(props) => props.theme?.color};
        padding-top: 6em;
        padding-left: 1em;
    }
`;

export const useSheetsQuery = (): MdxNodes => {
    const { allMdx } = useStaticQuery(
        graphql`
            query {
                allMdx(sort: { fields: frontmatter___title, order: DESC }) {
                    nodes {
                        frontmatter {
                            title
                            fullPath
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

const navLinks: NavLinkItem[] = [
    {
        slug: 'sheet',
        label: 'Sheets',
        children: [],
    },
];

const drawerWidth = 240;

const Header = ({ data }: HeaderProps): React.ReactElement => {
    const theme = useTheme();
    const { nodes } = useSheetsQuery();

    if ((nodes || []).length > 0) {
        navLinks[0].children = (nodes || []).map((node: NodeFromQuery): NavLinkItem => {
            return {
                slug: node.slug,
                label: node.frontmatter?.title || node.slug,
                // path: node.frontmatter?.fullPath
            };
        });
    }

    console.log('---------- data: ', data);
    console.log('---------- nodes: ', nodes);

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
                                <MenuNavLink
                                    depth={0}
                                    key={`${index}:${navLink.slug}`}
                                    navLink={navLink}
                                />
                            ))}
                        </StyledDrawer>
                    </ThemeProvider>
                </ThemeProvider>
            </Box>
        </ThemeProvider>
    );
};

export default Header;
