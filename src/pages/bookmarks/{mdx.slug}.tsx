import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';

const MDXRendererWrapper = styled.div`
    & #table-of-contents {
        margin-top: 0;
    }

    & h1#table-of-contents + ul > li:hover {
        transform: scale(1.01);
    }
`;

const BookmarkPage = ({ data }: BaseMdxProps): React.ReactElement => {
    // console.log('BookmarkPage - data: ', data);

    return (
        <MDXRendererWrapper id="bookmark-page-content">
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXRendererWrapper>
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

export default BookmarkPage;
