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
                id
                frontmatter {
                    fullPath
                    title
                }
                html
                internal {
                    contentDigest
                }
            }
        }
    }
}`;

const regexPatterns = {
    codeBlocks:
        /<div.+?class.+?\"gatsby-highlight.*?\".+?<pre.+?class.+?\".*?language-.+?\".+?<code.+?\">.+?<\/code>.*?<\/pre>.*?<\/div>/gims,
    innerSvgElements: /<path[^<]+<\/path>/gims,
    miscAttrs: /(class|focusable|style)=.*?\"[^\"]+?\"/gims,
};

function stripTagsFromHTML(htmlString: string) {
    return htmlString // force formatting
        .replace(regexPatterns.codeBlocks, '')
        .replace(regexPatterns.innerSvgElements, '')
        .replace(regexPatterns.miscAttrs, '');
}

function pageToAlgoliaRecord({ node }: { node: Queries.MarkdownRemark }) {
    const { id, frontmatter, html, internal } = node;
    const strippedHTML = stripTagsFromHTML(html || '');

    return {
        objectID: id,
        fullPath: frontmatter?.fullPath,
        title: frontmatter?.title,
        normalizedContent: strippedHTML.slice(0, 9000),
        contentDigest: internal.contentDigest,
    };
}

type PageQueryData = {
    pages: Queries.Query['allMarkdownRemark'];
};

const queries = [
    {
        query: pageQuery,
        transformer: ({ data }: { data: PageQueryData }) => {
            return data.pages.edges.map(pageToAlgoliaRecord);
        },
        indexName,
        settings: { attributesToSnippet: ['excerpt:20'] },
    },
];

export { queries };
