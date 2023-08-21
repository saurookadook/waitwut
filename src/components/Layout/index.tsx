import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeProvider } from 'styled-components';
import { CssBaseline } from '@mui/material';

import { HeadMetaContext, PageMapContext } from 'common/contexts';
import { Footer, Header, LeftSideMenu } from 'components/index';
import { GlobalStyles, pageMap } from 'constants/index';
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
        <HeadMetaContext.Provider value={{ children, title }}>
            <PageMapContext.Provider value={{ pageMap }}>
                {containerOnly() ? (
                    <ThemeProvider theme={resumeTheme}>
                        <GlobalStyles />
                        <StyledContainerOnly disableGutters={true}>
                            <StyledBoxOnly>{children}</StyledBoxOnly>
                        </StyledContainerOnly>
                    </ThemeProvider>
                ) : (
                    <ThemeProvider theme={baseTheme}>
                        <CssBaseline />
                        <GlobalStyles />
                        <Header />
                        <ThemeProvider theme={containerTheme}>
                            <StyledContainer disableGutters={true}>
                                <StyledBox>{children}</StyledBox>
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
