import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CssBaseline } from '@mui/material';

import { GlobalStyles } from '../constants';

interface HeadProps {
    children?: React.ReactElement;
    title?: string;
    data?: any;
    location?: any;
    pageContext?: any;
    params?: any;
}

const Head = ({ data, location, pageContext, params, title }: HeadProps): React.ReactElement => {
    console.log('Head props: ', { data, location, pageContext, params, title });
    const metaTitle = data?.mdx?.frontmatter?.title || '';
    const constructedTitle = metaTitle ? `wait, wut? | ${metaTitle}` : 'wait, wut?';
    return (
        <Helmet>
            {/* TODO: generate title based on page (i.e. for python, "wait, wut? | Python") */}
            <title>{`😬 ${constructedTitle}`}</title>
            <link
                id="devicon-sheet"
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
            />
            <CssBaseline />
            <GlobalStyles />
        </Helmet>
    );
};

export default Head;
