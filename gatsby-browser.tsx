// require("prismjs/themes/prism-okaidia.css");
// require("prismjs/themes/prism-twilight.css");

require("prismjs/themes/prism-tomorrow.css"); // closest one to Atom One Dark, I think?

const React = require('react'); // const causes a conflict?
const { Head: GatsbyBrowserHead } = require('./src/components');
const { Layout: GatsbyBrowserLayout } = require('./src/components');

exports.onRouteUpdate = ({ location, prevLocation }) => {
    console.log('new pathname', location.pathname);
    console.log('old pathname', prevLocation ? prevLocation.pathname : null);
};

exports.wrapPageElement = ({ element, props }) => {
    console.log('browser - wrapPageElement props: ', props);
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return (
        <GatsbyBrowserLayout {...props}>
            <GatsbyBrowserHead {...props} />
            {element}
        </GatsbyBrowserLayout>
    );
};
