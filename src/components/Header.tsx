import React from 'react';

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

const Header = () => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={appBarTheme}>
                    <StyledAppBar>
                        <Toolbar>
                            <Typography variant="h4" component="div">
                                wait, wut?
                            </Typography>
                        </Toolbar>
                    </StyledAppBar>
                </ThemeProvider>
            </Box>
        </ThemeProvider>
    );
}

export default Header;
