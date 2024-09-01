import React from 'react';
import { graphql } from 'gatsby';

import icons from 'components/icons';
import { GenericMarkdownPage } from 'components/pages';

// @ts-expect-error: need to define the type for markdown-only props
const SheetsPage = ({ data }) => {
    const { iconComponentName, title } = data.markdownRemark.frontmatter || {};

    const iconComponent = (): React.ReactElement | undefined => {
        if (iconComponentName && typeof icons[iconComponentName] === 'function') {
            return icons[iconComponentName]({});
        }
    };

    return (
        <GenericMarkdownPage // force formatting
            id="markdown-only-sheets-page-content"
            iconComponent={iconComponent}
            pageHtml={data.markdownRemark.html}
            title={title}
        />
    );
};

export const query = graphql`
    query ($id: String) {
        markdownRemark(id: { eq: $id }) {
            frontmatter {
                date(formatString: "MMMM D, YYYY")
                iconComponentName
                title
            }
            html
        }
    }
`;

export default SheetsPage;
