'use strict';

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: './',
    // outputDir: 'dist',
    assetsDir: 'static',
    // lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: 8080,
        disableHostCheck: true,
    },
    configureWebpack: {
        // name: '',
        resolve: {
            alias: {
                '@': resolve('src'),
                'src': resolve('src'),

            },
        },
        module:{
        }

    },

    chainWebpack:config=>{
            config.module
                .rule('md')
                .test(/\.md$/)
                .use('vue-loader')
                .loader('vue-loader')
                .end()
                .use('vue-markdown-loader')
                .loader('vue-markdown-loader/lib/markdown-compiler')
                .options({
                    raw: true
                })
    },

};

