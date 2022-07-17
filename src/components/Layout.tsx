import React from 'react';

import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
    Box,
    CssBaseline,
    Container
} from '@mui/material';

import { Header } from '../components';

import {
    baseTheme,
    containerTheme
} from '../themes';

// TODO: maybe move this elsewhere to clean up this file?
const GlobalStyles = createGlobalStyle`
    main {
        color: #232129;
        font-family: "-apple-system, Roboto, sans-serif, serif";
        padding: 96;
    }

    h1 {
        margin-top: 0;
        margin-bottom: 64;
        max-width: 320;
    }

    p {
        margin-bottom: 48;
    }

    li {
        font-size: 24;
        font-weight: 300;
        margin-bottom: 30;
        max-width: 560;
    }

    code {
        color: #8A6534;
        padding: 4;
        background-color: #FFF4DB;
        font-size: 1.25rem;
        border-radius: 4;
    }

    .heading-accent {
        color: #663399;
    }

    .doc-list {
        padding-left: 0;
    }

    .link-list {
        margin-bottom: 96;
        padding-left: 0;
    }

    .basic-link {
        color: #8954A8;
        font-size: 16;
        font-weight: bold;
        vertical-align: 5%;
    }

    .doc-link {
        .basic-link

        display: inline-block;
        list-style-type: none;
        margin-right: 12;
        margin-bottom: 24;
    }

    .badge {
        background-color: #088413;
        border: 1px solid #088413;
        borderRadius: 4;
        color: #ffffff;
        display: inline-block;
        font-size: 11;
        font-weight: bold;
        letter-spacing: 1;
        line-height: 1;
        margin-left: 10;
        padding: 4px 6px;
        position: relative;
        top: -2;
    }

    .description {
        color: #232129;
        font-size: 14;
        line-height: 1.25;
        margin-top: 10;
        margin-bottom: 0;
      }
`;

const StyledContainer = styled(Container)`
    height: 100vh;
    margin-top: 6em;
    max-width: 100vw !important;
`;

const StyledBox = styled(Box)`
    background-color: ${props => props?.theme?.backgroundColor};
    display: flex;
    flex-direction: column;
    height: ${props => props.theme?.height};
    min-height: 50vh;
    overflow-y: scroll;
    padding-right: 10vw;
    padding-left: 10vw;
`;

const Layout = ({ children }: any) => {
    return (
        <ThemeProvider theme={baseTheme}>
            <CssBaseline />
            <GlobalStyles />
            <Header />
            <ThemeProvider theme={containerTheme}>
                <StyledContainer disableGutters={true}>
                    <StyledBox>
                        {children}
                    </StyledBox>
                </StyledContainer>
            </ThemeProvider>
        </ThemeProvider>
    );
}

export default Layout;
