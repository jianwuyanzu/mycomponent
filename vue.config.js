const path = require('path');

module.exports = {
    baseUrl: '/',
    // 多页面应用配置
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    // 扩展webpack配置，使packages加入配置
    chainWebpack: config => {
        // vue默认@指向src目录，这里修正为examples，另外新增一个~指向packages
        config.resolve.alias
            .set('@', path.resolve('examples'))
            .set('~', path.resolve('packages'));
        // packages和examples目录需要加入编译
        config.module
            .rule('js')
            .include.add(/packages/).end()
            .include.add(/examples/).end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options;
            })
    },
    // webpack-dev-server选项配置
    devServer: {
        host: '0.0.0.0',
        port: '888',
        open: false,
        hot: true
    }
}