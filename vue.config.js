const path = require('path');

module.exports = {
    baseUrl: './',
    // publicPath: './',
    // 多页面应用配置
    productionSourceMap: false,
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    css: {
        sourceMap: false,
    },
    configureWebpack: {
        //关闭 webpack 的性能提示
	    performance: {
		    hints:false
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
        port: '666',
        open: false,
        hot: true
    }
}