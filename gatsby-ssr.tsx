// require("prismjs/themes/prism-okaidia.css");
// require("prismjs/themes/prism-twilight.css");

require("prismjs/themes/prism-tomorrow.css"); // closest one to Atom One Dark, I think?

const React = require('react'); // const causes a conflict?
const { Layout } = require('./src/components');

const HeadComponents = [
    <meta name="viewport" content="initial-scale=1, width=device-width" />,
    <link
        rel="preload"
        href="https://fonts.pluralsight.com/ps-tt-commons/v1/ps-tt-commons-variable-roman.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="true"
    />,
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@pluralsight/design-tokens@0.4.1/fonts.css"
    />,
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@pluralsight/design-tokens@0.4.1/npm/normalize/normalize.css"
    />
]

exports.onRenderBody = ({ setHeadComponents, setBodyAttributes }, pluginOptions) => {
    setHeadComponents(HeadComponents)
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
