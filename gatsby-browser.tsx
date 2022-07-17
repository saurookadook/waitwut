var React = require('react'); // const causes a conflict?
const { Layout: GatsbyBrowserLayout } = require('./src/components');

// Adds a class name to the body element
exports.onRenderBody = ({ setBodyAttributes }, pluginOptions) => {
    setBodyAttributes({
      className: "my-body-class",
    })
  }

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
