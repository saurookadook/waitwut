import * as React from 'react';
import { Helmet } from 'react-helmet';
import { css } from 'styled-components';

import { defaultColors } from 'themes';
import { isResumePage } from 'utils';

const baseStyles = css`
    :root {
        background-color: ${defaultColors.backgroundColor};
        color: ${defaultColors.color};
        font-family: '-apple-system, Roboto, sans-serif, serif';
        font-size: 100%;
        margin: 0;
        min-height: 100vh;
        overscroll-behavior-y: none; /* TODO: only apply this for "desktop"? */
    }
`;

const Head = ({
    data, // <- to force formatting
    location,
    pageContext,
    params,
    title,
}: {
    children?: React.ReactElement;
    title?: string;
    data?: any;
    location?: any;
    pageContext?: any;
    params?: any;
}): React.ReactElement => {
    console.log('Head props: ', { data, location, pageContext, params, title });

    const metaTitle = data?.mdx?.frontmatter?.title || '';
    const waitWutTitle = metaTitle ? `wait, wut? | ${metaTitle}` : 'wait, wut?';
    const constructedTitle = isResumePage(location.pathname) ? 'AM Resume' : `😬 ${waitWutTitle}`;

    return (
        <Helmet>
            <title>{constructedTitle}</title>
            <link
                id="devicon-sheet"
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
            />
            <style>{baseStyles.toString().replace(/,/g, '')}</style>
        </Helmet>
    );
};

export default Head;
