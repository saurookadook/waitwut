import * as React from 'react';
import { Link } from 'gatsby';
import styled, { ThemeProvider, useTheme } from 'styled-components';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

import { minWidth600, minWidth870, minWidth1024 } from '../styles/mq';
import { appBarTheme } from '../themes';

const StyledAppBar = styled(AppBar)`
    background-color: ${(props) => props?.theme?.backgroundColor} !important;
    color: ${(props) => props.theme?.color} !important;
    z-index: 1000000 !important;
`;

const MenuButton = styled(IconButton)`
    .header-items-wrapper & {
        height: 24px;
        padding: 0px;
        width: 24px;
    }
`;

const CustomMenuIcon = styled.span`
    transition: all 300ms ease-in;

    &,
    &::before,
    &::after {
        background-color: ${(props) => props.theme?.color};
        border-radius: 2px;
        position: absolute;
    }

    /* TODO: the heights should be a divisor of 24 */
    &::before,
    &::after {
        content: '\\0020';
        display: block;
        height: 5px;
        transition: transform 250ms ease-in-out;
        width: 24px;
    }

    &.menu-closed {
        height: 5px;
        width: 24px;
        z-index: 10;

        &::before {
            left: 0;
            top: -10px;
        }

        &::after {
            left: 0;
            top: 10px;
        }
    }

    &.menu-open {
        background-color: transparent;

        &::before {
            left: -10px;
            top: -12px;
            transform: rotateZ(45deg);
            transform-origin: 0 100%;
        }

        &::after {
            left: -10px;
            top: 6px;
            transform: rotateZ(-45deg);
            transform-origin: 0 0;
        }
    }

    ${minWidth1024} {
        &,
        &::before,
        &::after {
            display: none;
            height: 0;
            visibility: hidden;
            width: 0;
        }
    }
`;

const NavLink = styled(Link)`
    color: ${(props) => props?.theme?.color};
    display: flex;
    font-size: 1.5rem;
    min-width: 7rem;
    padding: 0 1em;
    text-align: center;
    text-decoration: none;

    ${minWidth600} {
        margin-left: 5%;
    }

    ${minWidth870} {
        margin-left: 12em;
    }
`;

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
