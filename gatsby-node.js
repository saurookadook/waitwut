const path = require('path');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                common: path.resolve(__dirname, 'src/common/'),
                components: path.resolve(__dirname, 'src/components/'),
                constants: path.resolve(__dirname, 'src/constants/'),
                pages: path.resolve(__dirname, 'src/pages/'),
                resume: path.resolve(__dirname, 'src/resume/'),
                themes: path.resolve(__dirname, 'src/themes/'),
                utils: path.resolve(__dirname, 'src/utils/'),
            },
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
    });
};
