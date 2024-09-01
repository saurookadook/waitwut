import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { PageContentWrapper } from 'components/pages/styled';

const BookmarkPage = ({ data }: BaseMdxProps): React.ReactElement => {
    // console.log('BookmarkPage - data: ', data);

    return (
        <PageContentWrapper id="bookmark-page-content">
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

export default BookmarkPage;
