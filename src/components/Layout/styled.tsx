import styled from 'styled-components';
import { Box, Container } from '@mui/material';

import { minWidth600 } from 'styles/mq';
import { resumeTheme, themeColors } from 'themes';

const StyledContainerOnly = styled(Container)`
    &#resume-content {
        background: linear-gradient(to bottom, ${resumeTheme.psSuccessTextWeakHex} 50%, ${themeColors.plBlue} 50%);
        max-width: 100vw;
        min-height: 100vh;
        padding: 0;
    }
`;

const StyledBoxOnly = styled(Box)`
    display: flex;
    flex-direction: column;
    height: ${(props) => props.theme?.height};
    min-height: 50vh;
    overflow-y: scroll;
    padding: 2rem 0;
`;

const StyledContainer = styled(Container)`
    &#content-container {
        background-color: ${(props) => props?.theme?.backgroundColor};
        height: auto;
        min-height: ${(props) => props?.theme?.height};
        max-width: 100vw;
        padding: 0 0 1rem;

        ${minWidth600} {
            padding: 0 2.5rem 1rem;
        }
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
