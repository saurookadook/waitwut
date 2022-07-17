var React = require('react'); // const causes a conflict?
const { Layout: GatsbyBrowserLayout } = require('./src/components');

// Logs when the client route changes
exports.onRouteUpdate = ({ location, prevLocation }) => {
    console.log('new pathname', location.pathname);
    console.log('old pathname', prevLocation ? prevLocation.pathname : null);
};

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return (
        <GatsbyBrowserLayout {...props}>
            {element}
        </GatsbyBrowserLayout>
    );
};
