// require("prismjs/themes/prism-okaidia.css");
// require("prismjs/themes/prism-twilight.css");

require("prismjs/themes/prism-tomorrow.css"); // closest one to Atom One Dark, I think?

const React = require('react'); // const causes a conflict?
const { CssBaseline } = require('@mui/material')
const { Layout } = require('./src/components');

const HeadComponents = [
    <meta key="head-component-1" name="viewport" content="initial-scale=1, width=device-width" />,
    <link
        key="head-component-2"
        rel="preload"
        href="https://fonts.pluralsight.com/ps-tt-commons/v1/ps-tt-commons-variable-roman.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="true"
    />,
    <link
        key="head-component-3"
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@pluralsight/design-tokens@0.4.1/fonts.css"
    />,
    <link
        key="head-component-4"
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@pluralsight/design-tokens@0.4.1/npm/normalize/normalize.css"
    />,
    <link
        key="head-component-5"
        id="devicon-sheet"
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
    />,
    <CssBaseline
        key="head-component-6"
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
