import React from 'react';
import { graphql } from 'gatsby';
// import { MDXRenderer } from 'gatsby-plugin-mdx';

import { MDXRendererWrapper } from 'components/pages/styled';

const BookmarkPage = ({ children, data }: BaseMdxProps): React.ReactElement => {
    // console.log('BookmarkPage - data: ', data);

    return (
        <MDXRendererWrapper id="bookmark-page-content">
            {/* <MDXRenderer>{data.mdx.body}</MDXRenderer> */}
            {children}
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
        }
    }
`;

export default BookmarkPage;
