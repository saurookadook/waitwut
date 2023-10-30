import styled from 'styled-components';
import { Drawer } from '@mui/material';

const StyledDrawer = styled(Drawer)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    color: ${(props) => props.theme?.color};

    & > .MuiDrawer-paper {
        background-color: transparent;
        border: none;
        color: ${(props) => props.theme?.color};
        max-height: calc(100vh - 5rem);
        padding-top: 6rem;
        padding-left: 1rem;
    }
`;

export { StyledDrawer };
