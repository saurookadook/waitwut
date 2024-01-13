import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';

import { pageMap } from 'common/constants';
import { HeadMetaContext, PageMapContext } from 'common/contexts';
import { Footer, Header, LeftSideMenu } from 'components/index';
import { AppStateProvider } from 'store';
import { GlobalStyles, WaitwutStyles, ResumeStyles } from 'styles';
import { baseTheme, containerTheme, resumeTheme } from 'themes/index';
import { StyledContainerOnly, StyledBoxOnly, StyledContainer, StyledBox } from './styled';

interface LayoutProps {
    pageTitle?: string;
    children: React.ReactElement;
    location: Record<string, string>;
}

const Layout = ({ pageTitle, children, location }: LayoutProps): React.ReactElement => {
    const containerOnly = (): boolean => /\/resume(?=(\/)?([?&#].*$|$))/gim.test(location.pathname);

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
        <AppStateProvider>
            <HeadMetaContext.Provider value={{ children, title }}>
                <PageMapContext.Provider value={{ pageMap }}>
                    {containerOnly() ? (
                        <ThemeProvider theme={resumeTheme}>
                            <GlobalStyles />
                            <ResumeStyles />
                            <StyledContainerOnly id="resume-content" disableGutters={true}>
                                <StyledBoxOnly>{children}</StyledBoxOnly>
                            </StyledContainerOnly>
                        </ThemeProvider>
                    ) : (
                        <ThemeProvider theme={baseTheme}>
                            <CssBaseline />
                            <GlobalStyles />
                            <WaitwutStyles />
                            <Header />
                            <ThemeProvider theme={containerTheme}>
                                <StyledContainer id="content-container" disableGutters={true}>
                                    <StyledBox>{children}</StyledBox>
                                    <LeftSideMenu />
                                </StyledContainer>
                                <Footer />
                            </ThemeProvider>
                        </ThemeProvider>
                    )}
                </PageMapContext.Provider>
            </HeadMetaContext.Provider>
        </AppStateProvider>
    );
};

export default Layout;
