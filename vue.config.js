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

};

