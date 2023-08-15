import * as React from 'react';
import { Helmet } from 'react-helmet';
import { css } from 'styled-components';

import { themeColors } from '../themes';

const BaseStyles = css`
    :root {
        --base-font-size: 16px;

        background-color: ${themeColors.white};
        color: ${themeColors.graphite};
        font-family: '-apple-system, Roboto, sans-serif, serif';
        font-size: var(--base-font-size);
        margin: 0;
        min-height: 100vh;
        overscroll-behavior-y: none; /* TODO: only apply this for "desktop"? */
    }
`;

interface HeadProps {
    children?: React.ReactElement;
    title?: string;
    data?: any;
    location?: any;
    pageContext?: any;
    params?: any;
}

const Head = ({
    data, // <- to force formatting
    location,
    pageContext,
    params,
    title,
}: HeadProps): React.ReactElement => {
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
            <style>{BaseStyles.toString()}</style>
        </Helmet>
    );
};

export default Head;
