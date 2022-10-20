import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
    Box,
    CssBaseline,
    Container
} from '@mui/material';

import { Footer, Header } from '../components';

import {
    baseTheme,
    containerTheme,
    themeColors
} from '../themes';

// TODO: maybe move this elsewhere to clean up this file?
const GlobalStyles = createGlobalStyle`
    html {
        background-color: ${(props) => props?.theme?.backgroundColor};
    }

    body#waitwut-body {
        font-size: 12px;
        min-height: 100vh;
    }

    main {
        color: #232129;
        font-family: "-apple-system, Roboto, sans-serif, serif";
        padding: 96px;
    }

    h1 {
        margin-top: 0;
        margin-bottom: 0.5em;
    }

    h1:first-of-type {
        margin-top: 1em;
    }

    p {
        margin-bottom: 48px;
    }

    li {
        font-size: 18px;
        font-weight: 300;
        margin-bottom: 30px;
        /* max-width: 560px; */
    }

    code {
        color: #8A6534;
        padding: 4px;
        background-color: #FFF4DB;
        font-size: 1.25rem;
        border-radius: 4px;
    }


    /* https://css-tricks.com/examples/hrs/ */
    hr {
        border: 0 none;
        opacity: 1;
        width: 100%;

        border-top: 1px solid ${themeColors.darkerPurpleHex};

        /* height: 1px; */
        /* color: ${themeColors.darkerPurpleHex}; */
        /* background: ${themeColors.darkerPurpleHex}; */
        /* background-image: linear-gradient(to right, ${themeColors.keywordPurple}, ${themeColors.darkerPurpleHex}, ${themeColors.keywordPurple}); */
    }

    .heading-accent {
        color: #663399;
        font-size: 0.75em;
    }

    .doc-list {
        padding-left: 0;
    }

    .link-list {
        margin-bottom: 96px;
        padding-left: 0;
    }

    .basic-link {
        color: #8954A8;
        font-size: 16px;
        font-weight: bold;
        vertical-align: 5%;
    }

    .doc-link {
        .basic-link

        display: inline-block;
        list-style-type: none;
        margin-right: 12px;
        margin-bottom: 24px;
    }

    .badge {
        background-color: #088413;
        border: 1px solid #088413;
        border-radius: 4px;
        color: #ffffff;
        display: inline-block;
        font-size: 11px;
        font-weight: bold;
        letter-spacing: 1;
        line-height: 1;
        margin-left: 10px;
        padding: 4px 6px;
        position: relative;
        top: -2px;
    }

    .description {
        color: #232129;
        font-size: 14px;
        line-height: 1.25;
        margin-top: 10px;
        margin-bottom: 0px;
    }
`;

const StyledContainer = styled(Container)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    height: 100vh;
    margin-top: 6em;
    max-width: 100vw !important;
    padding: 0 2.5em 1.5em;
`;

const StyledBox = styled(Box)`
    background-color: ${(props) => props?.theme?.backgroundColor};
    display: flex;
    flex-direction: column;
    height: ${(props) => props.theme?.height};
    min-height: 50vh;
    overflow-y: scroll;
    padding-right: 10vw;
    padding-left: 12vw;
`;

interface LayoutProps {
    pageTitle?: string;
    children: React.ReactElement
}

const Layout = ({ pageTitle, children }: LayoutProps): React.ReactElement => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    const title = pageTitle || data?.site?.siteMetadata?.title;

    // console.log('------------------------------------------------------------------------ Layout ------------------------------------------------------------------------');
    // console.log(' - pageTitle: ', pageTitle);
    // console.log(' - title: ', data?.site?.siteMetadata?.title);
    // console.log(' - children: ', children);
    // console.log(' - data: ', data);

    return (
        <ThemeProvider theme={baseTheme}>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
            <CssBaseline />
            <GlobalStyles />
            {/* TODO: generate title based on page (i.e. for python, "wait, wut? | Python") */}
            <title>😬 {title}</title>
            <Header />
            <ThemeProvider theme={containerTheme}>
                <StyledContainer disableGutters={true}>
                    <StyledBox>
                        {children}
                    </StyledBox>
                </StyledContainer>
            </ThemeProvider>
            <Footer />
        </ThemeProvider>
    );
};

export default Layout;
