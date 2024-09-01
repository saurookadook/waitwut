import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import icons from 'components/icons';
import { PageContentWrapper } from 'components/pages/styled';

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

const DocSheet = ({ data }: BaseMdxProps): React.ReactElement => {
    // console.log('DocSheet - data: ', data);
    const { iconComponentName, title } = data?.mdx?.frontmatter || {};

    const iconComponent = (): React.ReactElement | undefined => {
        if (iconComponentName && typeof icons[iconComponentName] === 'function') {
            return icons[iconComponentName]({});
        }
    };

    return (
        <PageContentWrapper id="sheet-page-content">
            <DocTitle>
                {iconComponent()}
                <span>{title}</span>
            </DocTitle>
            <hr />
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </PageContentWrapper>
    );
};

export const query = graphql`
    query ($id: String) {
        mdx(id: { eq: $id }) {
            frontmatter {
                date(formatString: "MMMM D, YYYY")
                iconComponentName
                title
            }
            body
        }
    }
`;

export default DocSheet;
