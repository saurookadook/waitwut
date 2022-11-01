import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import {
    Box,
    CssBaseline,
    Container,
} from '@mui/material';

import { Footer, Header, LeftSideMenu } from '../components';
import { GlobalStyles, pageMap } from '../constants';

import {
    baseTheme,
    containerTheme,
} from '../themes';

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

export const PageMapContext = React.createContext({ pageMap });

const Layout = ({ pageTitle, children }: LayoutProps): React.ReactElement => {

    const staticData = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    const title = pageTitle || staticData?.site?.siteMetadata?.title;

    // console.log('------------------------------------------------------------------------ Layout ------------------------------------------------------------------------');
    // console.log(' - pageTitle: ', pageTitle);
    // console.log(' - title: ', data?.site?.siteMetadata?.title);
    // console.log(' - children: ', children);
    // console.log(' - data: ', data);

    return (
        <PageMapContext.Provider value={{ pageMap }}>
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
                        <LeftSideMenu />
                    </StyledContainer>
                </ThemeProvider>
                <Footer />
            </ThemeProvider>
        </PageMapContext.Provider>
    );
};

export default Layout;
