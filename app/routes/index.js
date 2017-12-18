var router = require('express').Router();

exports.requestMapping = '/index';
//路由
router.param('id', function (req, res, next, id) {
    console.log('print id1 ' + id);
    next();
})
router.get('/user', function (req, res, next) {
    console.log('print id2 ' + "ksdjkj");
    next();
});
router.get('/user/:id', function (req, res) {
    console.log('print id3 ' + req.params.id);
    res.render('index.html', { title: 'Hey', message: '444Hello there!', supplies: ['5mop', '2broom', '1duster'] });
    //   res.end();
});

exports.router = router;