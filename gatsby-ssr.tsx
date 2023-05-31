// require("prismjs/themes/prism-okaidia.css");
// require("prismjs/themes/prism-twilight.css");

require("prismjs/themes/prism-tomorrow.css"); // closest one to Atom One Dark, I think?

const React = require('react'); // const causes a conflict?
const { Layout } = require('./src/components');

exports.onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
    setBodyAttributes({
        id: "waitwut-body",
    });
};

exports.wrapPageElement = ({ element, props }) => {
    // console.log('ssr - wrapPageElement element: ', element);
    // console.log('ssr - wrapPageElement props: ', props);
    return (
        <Layout {...props}>{element}</Layout>
    );
};
