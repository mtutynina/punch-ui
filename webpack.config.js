const path = require('path');
const bundleOutputDir = './dist';
const libraryName = "punch-ui";
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

const dts = require('dts-bundle');

function DtsBundlePlugin() {
}

DtsBundlePlugin.prototype.apply = (compiler) => {
    compiler.hooks.afterEmit.tap('dts-bundle', () => {
        dts.bundle({
            name: libraryName,
            main: 'out/src/index.d.ts',
            out: '../../dist/index.d.ts',
            removeSource: false,
            outputAsModuleFolder: true
        });
    });
};

module.exports = (env) => {
    return [{
        stats: { modules: false },
        entry: {
            'punch-ui': './src/index',
        },
        resolve: {
            extensions: ['.ts', '.html'],
        },
        externals: {
            knockout: 'knockout',
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/',
            library: {
                root: "PunchUI",
                amd: 'punch-ui',
                commonjs: 'punch-ui',
            },
            libraryTarget: "umd",
            umdNamedDefine: true   
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'raw-loader',
                            options: {
                                esModule: false,
                            },
                        },
                    ],
                },
                { test: /\.ts?$/, use: 'awesome-typescript-loader?silent=true' },
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new DtsBundlePlugin(),
        ],
    }];
};
