import styled from 'styled-components';
import { Drawer } from '@mui/material';

const StyledDrawer = styled(Drawer)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    color: ${(props) => props.theme?.color};

    & > .MuiDrawer-paper {
        background-color: ${(props) => props?.theme?.backgroundColor};
        border: none;
        box-shadow: inset -1px 0 5px ${(props) => props.theme?.color};
        color: ${(props) => props.theme?.color};
        padding-top: 6rem;
        padding-bottom: 6rem;
        padding-left: 1rem;
    }
`;

export { StyledDrawer };
