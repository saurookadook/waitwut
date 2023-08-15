import styled from 'styled-components';
import { Box, Container } from '@mui/material';

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
    height: 100vh;
    margin-top: 6em;
    max-width: 100vw !important;
    padding: 0 2.5em;
`;

const StyledBox = styled(Box)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    display: flex;
    flex-direction: column;
    height: ${(props) => props.theme?.height};
    min-height: 50vh;
    overflow-y: scroll;
    padding-right: 10vw;
    padding-bottom: 1.5em;
    padding-left: 12vw;
`;

export { StyledContainerOnly, StyledBoxOnly, StyledContainer, StyledBox };
