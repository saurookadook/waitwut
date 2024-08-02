const path = require('path');

// 'topLevelParent' and 'directParent' fields are inspired from
// - https://github.com/gatsbyjs/gatsby/issues/9630
// - https://github.com/meetup/swarm-design-system/blob/master/gatsby-node.js#L5-L35
exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;

    if (node?.frontmatter?.fullPath) {
        const pathComponents = node.frontmatter.fullPath.match(/[^/]+(?=\/|$)/gim);

        createNodeField({
            node,
            name: 'pathComponents',
            value: pathComponents,
        });

        createNodeField({
            node,
            name: 'topLevelParent',
            value: pathComponents[0],
        });

        createNodeField({
            node,
            name: 'directParent',
            value: pathComponents.length > 1 ? pathComponents[pathComponents.length - 2] : '',
        });

        if (node?.slug == null || node?.frontmatter?.slug == null) {
            const slugFromPathComponents =
                pathComponents.length < 2 ? pathComponents[0] : pathComponents.slice(1).join('/');

            if (slugFromPathComponents != null) {
                createNodeField({
                    node,
                    name: 'slug',
                    value: slugFromPathComponents,
                });
            }
        }
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
