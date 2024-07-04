const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const bookmarkPageTemplate = path.resolve(`./src/pages/bookmarks/{mdx.fields__slug}.tsx`);
// const bookmarkPageTemplate = path.resolve(`./src/pages/bookmarks/single-page.tsx`);
const bookmarksListPageTemplate = path.resolve(`./src/pages/bookmarks/index.tsx`);
const notePageTemplate = path.resolve(`./src/pages/notes/{mdx.fields__slug}.tsx`);
// const notePageTemplate = path.resolve(`./src/pages/notes/single-page.tsx`);
const notesListPageTemplate = path.resolve(`./src/pages/notes/index.tsx`);
const sheetPageTemplate = path.resolve(`./src/pages/sheets/{mdx.fields__slug}.tsx`);
// const sheetPageTemplate = path.resolve(`./src/pages/sheets/single-page.tsx`);
const sheetsListPageTemplate = path.resolve(`./src/pages/sheets/index.tsx`);

// exports.createSchemaCustomization = ({ actions }) => {
//     const { createTypes } = actions;

//     const typeDefs = `

//     `;
// }

exports.onCreateNode = ({ actions, getNode, node, reporter }) => {
    const { createNodeField } = actions;

    reporter.info(`internalType: ${node.internal?.type}`);

    if (node?.frontmatter?.fullPath) {
        createNodeField({
            node,
            name: 'pathComponents',
            value: node.frontmatter.fullPath.match(/[^/]+(?=\/|$)/gim),
        });
    }

    if (node.internal?.type === 'Mdx') {
        const filePath = createFilePath({ node, getNode });
        reporter.info(`    MDX file path: ${filePath}    `.padStart(120, '=').padEnd(240, '='));
        createNodeField({
            node,
            name: 'slug',
            value: filePath,
        });
    }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage, createRedirect } = actions;
    let queryResult;

    try {
        queryResult = await graphql(`
            query {
                allMdx {
                    nodes {
                        id
                        fields {
                            slug
                        }
                        internal {
                            contentFilePath
                        }
                    }
                }
            }
        `);
    } catch (e) {
        reporter.panic('ERROR with graphql query', e);
    }

    if (typeof queryResult == null) {
        reporter.warn(`Error encountered with GraphQL query; skipping 'createPage' calls for allMdx.nodes...`);
    }

    if (queryResult.errors) {
        reporter.panicOnBuild('Error loading MDX result', queryResult.errors);
    }

    try {
        const {
            data: { allMdx },
        } = queryResult;

        allMdx.nodes.forEach((node) => {
            const templateComponent = (function () {
                if (node.fields.slug.indexOf('/bookmarks') === 0) {
                    return /^\/bookmarks(\/)?/gim.test(node.fields.slug)
                        ? bookmarksListPageTemplate
                        : bookmarkPageTemplate;
                } else if (node.fields.slug.indexOf('/notes') === 0) {
                    return /^\/notes(\/)?/gim.test(node.fields.slug) ? notesListPageTemplate : notePageTemplate;
                } else if (node.fields.slug.indexOf('/sheets') === 0) {
                    return /^\/sheets(\/)?/gim.test(node.fields.slug) ? sheetsListPageTemplate : sheetPageTemplate;
                }
            })();

            createPage({
                path: node.fields.slug,
                component: templateComponent
                    ? `${templateComponent}?__contentFilePath=${node.internal.contentFilePath}`
                    : node.internal.contentFilePath,
                context: { id: node.id },
            });

            // if (node.internal?.contentFilePath != null) {
            //     createPage({
            //         path: node.fields.slug,
            //         component: node.internal.contentFilePath,
            //         context: { id: node.id },
            //     });
            // }
        });
    } catch (e) {
        reporter.panicOnBuild('ERROR creating pages for nodes', e);
    }
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                common: path.resolve(__dirname, 'src/common'),
                components: path.resolve(__dirname, 'src/components'),
                constants: path.resolve(__dirname, 'src/constants'),
                images: path.resolve(__dirname, 'src/images'),
                pages: path.resolve(__dirname, 'src/pages'),
                resume: path.resolve(__dirname, 'src/resume'),
                store: path.resolve(__dirname, 'src/store'),
                styles: path.resolve(__dirname, 'src/styles'),
                themes: path.resolve(__dirname, 'src/themes'),
                utils: path.resolve(__dirname, 'src/utils'),
            },
            extensions: ['.ts', '.tsx'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
    });
};
