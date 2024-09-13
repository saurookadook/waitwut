/**
 * @description Copied from {@link https://github.com/sindresorhus/escape-string-regexp/blob/main/index.js|escape-string-regexp}
 */
function escapeStringRegexp(string: string) {
    return string // force formatting
        .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        .replace(/-/g, '\\x2d');
}

const pagesPath = 'docs';
const indexName = 'Pages';

const pageQuery = `{
    pages: allMarkdownRemark(
        filter: {
            fileAbsolutePath: { regex: "/${escapeStringRegexp(pagesPath)}/"}
        }
    ) {
        edges {
            node {
                frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    fullPath
                    sectionSlug
                    title
                }
                fields {
                    pathComponents
                    slug
                }
                html
                id
                internal {
                    contentDigest
                }
            }
        }
    }
}`;

function pageToAlgoliaRecord({ node }: { node: Queries.MarkdownRemark }) {
    const { id, frontmatter, fields, ...rest } = node;
    return {
        objectID: id,
        ...frontmatter,
        ...fields,
        ...rest,
    };
}

type PageQueryData = {
    pages: Queries.Query['allMarkdownRemark'];
};

const queries = [
    {
        query: pageQuery,
        transformer: ({ data }: { data: PageQueryData }) =>
            data.pages.edges.map(pageToAlgoliaRecord),
        indexName,
        settings: { attributesToSnippet: ['excerpt:20'] },
    },
];

export { queries };
