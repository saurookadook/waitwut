import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
// import { MDXRenderer } from 'gatsby-plugin-mdx';

import { MDXRendererWrapper } from 'components/pages/styled';

const BookmarkPage = ({ children, data }: BaseMdxProps): React.ReactElement => {
    // console.log('BookmarkPage - data: ', data);

    return (
        <MDXRendererWrapper id="bookmark-page-content">
            {/* <MDXRenderer>{data.mdx.body}</MDXRenderer> */}
            <MDXProvider>{children || data.mdx.body}</MDXProvider>
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
