import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

import icons from '../../components/icons';

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

const MDXRendererWrapper = styled.div`
    & #table-of-contents {
        margin-top: 0;
    }

    & h1#table-of-contents + ul > li:hover {
        transform: scale(1.01);
    }
`

const DocSheet = ({ data }: DocSheetProps): React.ReactElement => {
    console.log('DocSheet - data: ', data);
    const { iconComponentName, title } = data?.mdx?.frontmatter || {}

    const iconComponent = (): React.ReactElement | undefined => {
        if (iconComponentName && typeof icons[iconComponentName] === "function") {
            return icons[iconComponentName]();
        }
    };

    return (
        <>
            <DocTitle>
                {iconComponent() || null}
                <span>{title}</span>
            </DocTitle>
            <hr />
            <MDXRendererWrapper>
                <MDXRenderer>
                    {data.mdx.body}
                </MDXRenderer>
            </MDXRendererWrapper>
        </>
    );
};

export const query = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
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
