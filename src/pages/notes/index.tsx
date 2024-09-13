import * as React from 'react';
import { graphql } from 'gatsby';

import { GenericListPage } from 'components/pages';

const NotesListPage = ({
    data, // force formatting
}: {
    data: ListPageData;
}): React.ReactElement => {
    // console.log('NotesListPage - data: ', data);
    const { nodes } = data.allMarkdownRemark || {};

    return <GenericListPage nodes={nodes} />;
};

export const query = graphql`
    query {
        allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { sectionSlug: { eq: "notes" } } }
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

export default NotesListPage;
