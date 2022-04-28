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
        proxy:{
            '/localSever':{
                target: 'http://localhost:3000', //后台接口域名
                ws:false,       //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin:true, //是否跨域
                pathRewrite:{
                    '^/localSever':'' //路径重写
                }
            },
            '/poems':{
                target: 'https://v2.jinrishici.com',//后台接口域名
                ws:false,       //如果要代理 websockets，配置这个参数
                secure: true,  // 如果是https接口，需要配置这个参数
                changeOrigin:true, //是否跨域
                pathRewrite:{
                    '^/poems':'' //路径重写
                }
            },
        }
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

