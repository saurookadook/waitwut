import React, { useContext } from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import { Box, Toolbar, Typography } from '@mui/material';

import { StateContext, DispatchContext } from 'common/contexts';
import { toggleMenuDrawer } from 'store/actions';
import { appBarTheme } from 'themes';
import { StyledAppBar, MenuButton, CustomMenuIcon, NavLink } from './styled';

const Header = ({ data }: HeaderProps): React.ReactElement => {
    const { menu } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const theme = useTheme();

    // console.log('---------- data: ', data);
    // console.log('---------- nodes: ', nodes);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <ThemeProvider theme={appBarTheme}>
                    <StyledAppBar>
                        <Toolbar className="header-items-wrapper">
                            <MenuButton onClick={() => toggleMenuDrawer({ dispatch })}>
                                <CustomMenuIcon className={menu.drawerVisible ? 'menu-open' : 'menu-closed'} />
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
