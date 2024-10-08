import React, { useContext } from 'react';
import { ThemeProvider, useTheme } from 'styled-components';
import { Box, Toolbar, Typography } from '@mui/material';

import { StateContext, DispatchContext } from 'common/contexts';
import { SearchField } from 'components';
import { closeMenuDrawer, toggleMenuDrawer } from 'store/actions';
import { appBarTheme } from 'themes';
import {
    StyledAppBar, // force formatting
    MenuButton,
    CustomMenuIcon,
    NavLink,
    StyledAppBarSpacer,
} from './styled';

const Header = ({
    data, // force formatting
}: {
    data?: ListPageData;
}): React.ReactElement => {
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
                                <CustomMenuIcon
                                    className={menu.drawerVisible ? 'menu-open' : 'menu-closed'}
                                />
                            </MenuButton>
                            <Typography variant="h4" component="div">
                                <NavLink to="/" onClick={() => closeMenuDrawer({ dispatch })}>
                                    wait, wut?
                                </NavLink>
                            </Typography>
                        </Toolbar>
                        <StyledAppBarSpacer />
                        <SearchField />
                    </StyledAppBar>
                </ThemeProvider>
            </Box>
        </ThemeProvider>
    );
};

export default Header;
