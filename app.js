var express = require('express');
var app = express();
var ejs = require('ejs');
var http = require('http');

app.get('/',function(req, res){
    res.render('index.html', { title: 'Hey', message: 'Hello there!'});
})

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.set('views', './views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

//var server = http.createServer(app);

var server = app.listen(3000,function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
})
