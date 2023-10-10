import * as React from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import { Box, Toolbar, Typography } from '@mui/material';

import { appBarTheme } from 'themes';
import { StyledAppBar, NavLink } from './styled';

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
