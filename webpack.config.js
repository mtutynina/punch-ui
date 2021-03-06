const path = require('path');
const bundleOutputDir = './dist';
const libraryName = "punch-ui";

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
            outputAsModuleFolder: true,
        });
    });
};

module.exports = (env) => {
    return [{
        target: 'web',
        stats: { modules: false },
        entry: {
            'punch-ui': './src/index',
        },
        resolve: {
            extensions: ['.ts', '.html'],
        },
        externals: {
            knockout: {
                commonjs: 'knockout',
                commonjs2: 'knockout',
                amd: 'ko',
                root: 'ko',
            },
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/',
            library: {
                root: "punch",
                amd: 'punch',
                commonjs: 'punch',
            },
            libraryTarget: "umd",
            globalObject: 'this',
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
                { test: /\.ts?$/, use: 'ts-loader?silent=true' },
            ]
        },
        plugins: [
            new DtsBundlePlugin(),
        ],
    }];
};
