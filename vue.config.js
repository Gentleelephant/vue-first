let proxyObj = {};
proxyObj['/ws'] = {
    ws: true,
    target: "ws//localhost:8081"
};
proxyObj['/'] = {
    ws: false,                           /*关闭websocket*/
    target: 'http://localhost:8081',     /*目标转发地址*/
    changeOrigin: true,
    pathRewrite: {
        '^/': ''                         /*拦截到的请求不修改*/
    }
};

module.exports = {
    // 防止凡人的ESlint
    lintOnSave: false,
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
};


// module.exports = {
//     devServer: {
//         host: 'localhost',
//         port: 8080,
//         proxy: {
//             '/doLogin': {
//                 ws: false,
//                 target: 'http://localhost:8081',
//                 changeOrigin: true
//             }
//         }
//     }
// }