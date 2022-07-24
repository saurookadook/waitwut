// require("prismjs/themes/prism-okaidia.css");
// require("prismjs/themes/prism-twilight.css");

require("prismjs/themes/prism-tomorrow.css"); // closest one to Atom One Dark, I think?

var React = require('react'); // const causes a conflict?
const { Layout } = require('./src/components');

// Adds a class name to the body element
exports.onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
    setBodyAttributes({
      className: "my-body-class",
    })
};

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
    console.log('ssr - wrapPageElement props: ', props);
    return (
        <Layout {...props}>{element}</Layout>
    );
};
