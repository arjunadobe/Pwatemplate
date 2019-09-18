const { configureWebpack } = require('@magento/pwa-buildpack');
const MediaBackendUrlFetcherPlugin = require('../../pwa-studio/packages/venia-concept/src/MediaBackendURLFetcherPlugin');
const { DefinePlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NormalModuleOverridePlugin = require('./normalModuleOverrideWebpackPlugin');
const componentOverrideMapping = require('./componentOverrideMapping');

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

    config.plugins = [
        ...config.plugins,
        new DefinePlugin({
            /**
             * Make sure to add the same constants to
             * the globals object in jest.config.js.
             */
            STORE_NAME: JSON.stringify('Extended Form Venia')
        }),
        new MediaBackendUrlFetcherPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ];

    config.plugins.push(
        new NormalModuleOverridePlugin(componentOverrideMapping)
    );

    // configureWebpack() returns a regular Webpack configuration object.
    // You can customize the build by mutating the object here, as in
    // this example:
    config.module.noParse = [/braintree\-web\-drop\-in/];
    // Since it's a regular Webpack configuration, the object supports the
    // `module.noParse` option in Webpack, documented here:
    // https://webpack.js.org/configuration/module/#modulenoparse

    return config;
};
