import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import {
    Box,
    CssBaseline,
    Container,
} from '@mui/material';

import { HeadMetaContext, PageMapContext } from '../common/contexts';
import { Footer, Header, LeftSideMenu } from '../components';
import { GlobalStyles, pageMap } from '../constants';

import {
    baseTheme,
    containerTheme,
    resumeTheme,
} from '../themes';

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

interface LayoutProps {
    pageTitle?: string;
    children: React.ReactElement
    location: Record<string, string>
}

const Layout = ({ pageTitle, children, location }: LayoutProps): React.ReactElement => {
    const containerOnly = (): boolean => /\/resume(?=(\/)?([?&#].*$|$))/gim.test(location.pathname)

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
        <HeadMetaContext.Provider value={{ children, title }}>
            <PageMapContext.Provider value={{ pageMap }}>
                {containerOnly() ? (
                    <ThemeProvider theme={resumeTheme}>
                        <GlobalStyles />
                        <StyledContainerOnly disableGutters={true}>
                            <StyledBoxOnly>
                                {children}
                            </StyledBoxOnly>
                        </StyledContainerOnly>
                    </ThemeProvider>
                ) : (
                    <ThemeProvider theme={baseTheme}>
                        <CssBaseline />
                        <GlobalStyles />
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
                )}
            </PageMapContext.Provider>
        </HeadMetaContext.Provider>
    );
};

export default Layout;
