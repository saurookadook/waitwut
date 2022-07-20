import * as React from 'react';
import { Link } from 'gatsby';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import {
    AppBar,
    Box,
    Toolbar,
    Typography
} from '@mui/material';

import { appBarTheme } from '../themes';

const StyledAppBar = styled(AppBar)`
    background-color: ${props => props?.theme?.backgroundColor} !important;
    color: ${props => props.theme?.color} !important;
`;

const NavLink = styled(Link)`
    color: ${props => props?.theme?.color};
    font-size: 1.5rem;
    padding: 0 1em;
    text-decoration: none;
`;

const navLinks = [
    {
        slug: 'sheet',
        label: 'Sheet'
    }
];

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
                            {navLinks.map((navLink, index) => (
                                <NavLink
                                    key={`${index}:${navLink.slug}`}
                                    to={`/${navLink.slug}`}
                                >
                                    {navLink.label}
                                </NavLink>
                            ))}

                        </Toolbar>
                    </StyledAppBar>
                </ThemeProvider>
            </Box>
        </ThemeProvider>
    );
}

export default Header;
