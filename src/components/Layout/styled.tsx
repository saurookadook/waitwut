import styled from 'styled-components';
import { Box, Container } from '@mui/material';

import { minWidth600 } from 'styles/mq';

const StyledContainerOnly = styled(Container)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    height: 100vh;
    max-width: 100vw !important;
    padding: 0;
`;

const StyledBoxOnly = styled(Box)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    display: flex;
    flex-direction: column;
    height: ${(props) => props.theme?.height};
    min-height: 50vh;
    overflow-y: scroll;
    padding: 0;
`;

const StyledContainer = styled(Container)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    height: auto;
    min-height: ${(props) => props?.theme?.height};
    margin-top: 6rem;
    max-width: 100vw !important;
    padding: 0;

    ${minWidth600} {
        padding: 0 2.5rem;
    }
`;

const StyledBox = styled(Box)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    display: flex;
    flex-direction: column;
    /* height: ${(props) => props.theme?.height}; */
    height: auto;
    min-height: 50vh;
    /* overflow-y: scroll; */
    padding-right: 2rem;
    /* padding-bottom: 1.5rem; */
    padding-left: 2rem;

    ${minWidth600} {
        padding-right: 10vw;
        padding-left: 12vw;
    }
`;

export { StyledContainerOnly, StyledBoxOnly, StyledContainer, StyledBox };
