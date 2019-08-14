const { configureWebpack } = require('@magento/pwa-buildpack');

const path = require('path');
const parentTheme = path.resolve(
    process.cwd() + '/../../pwa-studio/packages/venia-ui'
);

module.exports = async env => {
    const config = await configureWebpack({
        context: __dirname,
        vendor: [
            'apollo-cache-inmemory',
            'apollo-cache-persist',
            'apollo-client',
            'apollo-link-context',
            'apollo-link-http',
            'informed',
            'react',
            'react-apollo',
            'react-dom',
            'react-feather',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-actions',
            'redux-thunk'
        ],
        special: {
            '@magento/peregrine': {
                esModules: true,
                cssModules: true
            },
            '@magento/venia-ui': {
                cssModules: true,
                esModules: true,
                graphqlQueries: true,
                rootComponents: true,
                upward: true
            }
        },
        env
    });
     config.resolve={
            modules: [__dirname, 'node_modules', parentTheme],
            mainFiles: ['index'],
            extensions: ['.mjs', '.js', '.json', '.graphql'],
            alias: {
                parentSrc: path.resolve(parentTheme, 'lib'),
                parentComponents: path.resolve(parentTheme, 'lib/components'),
                parentQueries: path.resolve(parentTheme, 'lib/queries')
            }

     };

    // configureWebpack() returns a regular Webpack configuration object.
    // You can customize the build by mutating the object here, as in
    // this example:
    config.module.noParse = [/braintree\-web\-drop\-in/];
    // Since it's a regular Webpack configuration, the object supports the
    // `module.noParse` option in Webpack, documented here:
    // https://webpack.js.org/configuration/module/#modulenoparse

    return config;
};
