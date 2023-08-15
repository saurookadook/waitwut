import * as React from 'react';
import { Link } from 'gatsby';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { appBarTheme } from '../themes';

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

const Header = ({ data }: HeaderProps): React.ReactElement => {
    const theme = useTheme();


    // console.log('---------- data: ', data);
    // console.log('---------- nodes: ', nodes);

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
                </ThemeProvider>
            </Box>
        </ThemeProvider>
    );
};

export default Header;
