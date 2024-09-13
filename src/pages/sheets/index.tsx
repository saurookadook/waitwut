import * as React from 'react';
import { graphql } from 'gatsby';

import { GenericListPage } from 'components/pages';

// TODO: this and the bookmarks list page component could be the same lol
const SheetsPage = ({
    data, // force formatting
}: {
    data: ListPageData;
}): React.ReactElement => {
    // console.log('SheetsPage - data: ', data);
    const { nodes } = data.allMarkdownRemark || {};

    return <GenericListPage nodes={nodes} />;
};

export const query = graphql`
    query {
        allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { sectionSlug: { eq: "sheets" } } }
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

export default SheetsPage;
