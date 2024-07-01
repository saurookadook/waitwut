const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ actions, getNode, node, reporter }) => {
    const { createNodeField } = actions;

    reporter.info(`internalType: ${node.internal?.type}`);
    if (node.internal?.type === 'Mdx') {
        createNodeField({
            node,
            name: 'slug',
            value: createFilePath({ node, getNode }),
        });
    }

    if (node?.frontmatter?.fullPath) {
        createNodeField({
            node,
            name: 'pathComponents',
            value: node.frontmatter.fullPath.match(/[^/]+(?=\/|$)/gim),
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
            if (node.internal?.contentFilePath != null) {
                createPage({
                    path: node.fields.slug,
                    component: node.internal.contentFilePath,
                    context: { id: node.id },
                });
            }
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
