/*
*  用于
*/
var express = require('express');
var api = require('../app/schema');
var util = require('../app/utils/util');
var request = require('request');

var router = express.Router();

exports.requestMapping = '/services';

// 调用API服务
var apiService = function (req, res, next) {
    var platform = req.params.platform,
        service = req.params.service;
    // 是否提供平台服务
    if (api.services.hasOwnProperty(platform)) {
        var services = api.services[platform];
        // 平台是否提供相应服务
        if (services.hasOwnProperty(service)) {
            var url = services[service];
            request(url, function (error, response, body) {
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); 
            });
        } else {
            // 返回异常信息
            var err = new Error('ERROR NO SERVICE API FOUND ' + platform + '.' + service);
            err.status = 404;
            next(err);
        }
    } else {
        // 返回异常信息
        var err = new Error('ERROR NO SERVICE API FOUND ' + platform + '.' + service);
        err.status = 404;
        next(err);
    }
};
router.all('/:platform/:service', apiService);

exports.router = router;