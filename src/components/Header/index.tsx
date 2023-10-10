import * as React from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import { Box, Toolbar, Typography } from '@mui/material';

import { StyledAppBar, MenuButton, CustomMenuIcon, NavLink } from './styled';
import { appBarTheme } from 'themes';

const Header = ({ data }: HeaderProps): React.ReactElement => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const theme = useTheme();

    // console.log('---------- data: ', data);
    // console.log('---------- nodes: ', nodes);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={appBarTheme}>
                    <StyledAppBar>
                        <Toolbar className="header-items-wrapper">
                            <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
                                <CustomMenuIcon className={menuOpen ? 'menu-open' : 'menu-closed'} />
                            </MenuButton>
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
