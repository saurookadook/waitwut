import styled from 'styled-components';
import { Box, Container } from '@mui/material';

import { minWidth600, minWidth1024 } from 'styles/mq';
import { resumeTheme, themeColors } from 'themes';

const StyledContainer = styled(Container)`
    &#content-container {
        background-color: ${(props) => props?.theme?.backgroundColor};
        height: auto;
        min-height: calc(100vh - 11rem);
        max-width: 100vw;
        margin: 0 0 1.5rem;

        ${minWidth600} {
            margin-bottom: 2.5rem;
        }
    }

    &#resume-content {
        background: linear-gradient(to bottom, ${resumeTheme.psSuccessTextWeakHex} 50%, ${themeColors.plBlue} 50%);
        max-width: 100vw;
        min-height: 100vh;
        padding: 0;
    }
`;

const StyledBox = styled(Box)`
    #content-container & {
        background-color: ${(props) => props?.theme?.backgroundColor};
        display: flex;
        flex-direction: column;
        height: auto;
        min-height: 50vh;
        margin-right: 0;
        margin-left: 0;
        /* overflow-y: scroll; */
        padding-right: 2rem;
        padding-left: 2rem;

        ${minWidth600} {
            margin-right: 5vw;
            margin-left: 5vw;
        }

        ${minWidth1024} {
            margin-right: 12.5vw;
            margin-left: 20rem;
        }
    }

    #resume-content & {
        display: flex;
        flex-direction: column;
        height: ${(props) => props.theme?.height || 'auto'};
        min-height: 50vh;
        overflow-y: scroll;
        padding: 2rem 0;
    }
`;

export { StyledContainer, StyledBox };
