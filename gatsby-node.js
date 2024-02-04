const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node?.frontmatter?.fullPath) {
        createNodeField({
            node,
            name: 'pathComponents',
            value: node.frontmatter.fullPath.match(/[^/]+(?=\/|$)/gim),
        });
    }

    if (node.internal.type === 'Mdx') {
        createNodeField({
            node,
            name: 'slug',
            value: createFilePath({ node, getNode }),
        });
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
