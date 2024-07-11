import styled from 'styled-components';
import { Drawer } from '@mui/material';

import { minWidth600 } from 'styles/mq';

interface StyledDrawerProps {
    readonly $drawerWidth: number;
}

const StyledDrawer = styled(Drawer)<StyledDrawerProps>`
    background-color: ${(props) => props?.theme?.backgroundColor};
    color: ${(props) => props.theme?.color};
    flex-shrink: 0;

    &#side-nav-drawer,
    &#side-nav-drawer > .MuiDrawer-paper {
        width: 100vw;

        ${minWidth600} {
            max-width: 100vw;
            width: ${(props) => props.$drawerWidth / 16}rem;
        }
    }

    & > .MuiDrawer-paper {
        background-color: ${(props) => props?.theme?.backgroundColor};
        border: none;
        box-shadow: inset -1px 0 5px ${(props) => props.theme?.color};
        box-sizing: border-box;
        color: ${(props) => props.theme?.color};
        padding-top: 6rem;
        padding-left: 1rem;
    }
`;

const StyledAside = styled.aside``;

export { StyledDrawer, StyledAside };
