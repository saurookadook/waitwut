import * as React from 'react';
import { graphql } from 'gatsby';

import { GenericListPage } from 'components/pages';

const BookmarksListPage = ({
    data, // force formatting
}: {
    data: ListPageData;
}): React.ReactElement => {
    const { nodes } = data.allMarkdownRemark || {};

    return <GenericListPage nodes={nodes} />;
};

export const query = graphql`
    query {
        allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { sectionSlug: { eq: "bookmarks" } } }
        ) {
            nodes {
                fields {
                    pathComponents
                }
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    fullPath
                    sectionSlug
                    title
                }
            }
        }
    }
`;

export default BookmarksListPage;
