var express = require('express');
var app = express();
var ejs = require('ejs');
var http = require('http');
var filter = require('./core/filter');
var router = require('./core/router');

// ejs  模板引擎
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 设置 view 目录
app.set('views', './views');

// 静态资源托管
app.use(express.static('dist'));

// 请求拦截器
filter(app);

// 加载系统路由
router(app);

//404 处理
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

//500 处理
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// 启动app （http.Server.listen().）
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
})

//module.exports = app;