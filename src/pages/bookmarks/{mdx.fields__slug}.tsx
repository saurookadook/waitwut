import React from 'react';
import { graphql } from 'gatsby';

import { MDXRendererWrapper } from 'components/pages/styled';

const BookmarkPage = ({ data: { mdx }, children }: BaseMdxProps): React.ReactElement => {
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
            body
        }
    }
`;

export default BookmarkPage;
