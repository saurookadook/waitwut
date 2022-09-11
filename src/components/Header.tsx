import * as React from 'react';
import { Link } from 'gatsby';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import {
    AppBar,
    Box,
    Drawer,
    Toolbar,
    Typography
} from '@mui/material';

import { appBarTheme, menuTheme } from '../themes';

const StyledAppBar = styled(AppBar)`
    background-color: ${props => props?.theme?.backgroundColor} !important;
    color: ${props => props.theme?.color} !important;
    z-index: 1000000 !important;
`;

const NavLink = styled(Link)`
    color: ${props => props?.theme?.color};
    font-size: 1.5rem;
    margin-left: 12em;
    padding: 0 1em;
    text-align: center;
    text-decoration: none;
`;

const StyledDrawer = styled(Drawer)`
    background-color: ${props => props?.theme?.backgroundColor} !important;
    color: ${props => props.theme?.color} !important;

    & .MuiDrawer-paper {
        background-color: ${props => props?.theme?.backgroundColor} !important;
        border: none;
        color: ${props => props.theme?.color} !important;
        padding-top: 6em;
    }
`;

const MenuNavLink = styled(Link)`
    color: ${props => props?.theme?.color};
    font-size: 1.5rem;
    padding: 0 1em;
    text-align: center;
    text-decoration: none;
`;

const navLinks = [
    {
        slug: 'sheet',
        label: 'Sheet'
    }
];

const drawerWidth = 240;

const Header = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={appBarTheme}>
                    <StyledAppBar>
                        <Toolbar>
                            <Typography variant="h4" component="div">
                                <NavLink to='/'>
                                    wait, wut?
                                </NavLink>
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
                                        key={`${index}:${navLink.slug}`}
                                        to={`/${navLink.slug}`}
                                    >
                                        {navLink.label}
                                    </MenuNavLink>
                                ))}
                            </StyledDrawer>
                        </ThemeProvider>
                </ThemeProvider>
            </Box>
        </ThemeProvider>
    );
}

export default Header;
