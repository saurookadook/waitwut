import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import {
    Box,
    CssBaseline,
    Container
} from '@mui/material';

import { Footer, Header } from '../components';
import { GlobalStyles } from '../constants';

import {
    baseTheme,
    containerTheme,
} from '../themes';

// TODO: maybe move this elsewhere to clean up this file?

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
