import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import icons from 'components/icons';
import { MDXRendererWrapper } from 'components/pages/styled';

const DocTitle = styled.h1`
    align-items: center;
    display: flex;
    flex-direction: row;

    & > svg {
        height: 1.75em;
        margin-right: 0.25em;
        width: 1.75em;
    }

    & > span {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

// @ts-expect-error: need to define the type for markdown-only props
const NotePage = ({ data }) => {
    const { iconComponentName, title } = data.markdownRemark.frontmatter || {};

    const iconComponent = (): React.ReactElement | undefined => {
        if (iconComponentName && typeof icons[iconComponentName] === 'function') {
            return icons[iconComponentName]({});
        }
    };

    return (
        <MDXRendererWrapper id="markdown-only-note-content">
            <DocTitle>
                {iconComponent()}
                <span>{title}</span>
            </DocTitle>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </MDXRendererWrapper>
    );
};

export const query = graphql`
    query ($id: String) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                date(formatString: "MMMM D, YYYY")
                iconComponentName
                title
            }
            html
        }
    }
`;

export default NotePage;
