import styled from 'styled-components';
import { Link } from 'gatsby';
import { AppBar, IconButton } from '@mui/material';

import { minWidth600, minWidth870, minWidth1024 } from '../../styles/mq';

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

    ${minWidth1024} {
        display: none;
        height: 0;
        visibility: hidden;
        width: 0;
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
    display: inline-block;
    font-size: 1.5rem;
    margin-left: 0;
    padding: 0 1em;
    text-align: center;
    text-decoration: none;
    width: max-content;

    ${minWidth600} {
        margin-left: 5%;
    }

    ${minWidth870} {
        margin-left: 12em;
    }
`;

export { StyledAppBar, MenuButton, CustomMenuIcon, NavLink };
