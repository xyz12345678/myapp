var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream(__dirname + '/example.zip');
var archive = archiver('zip', {
    zlib: { level: 9 }
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);

archive.finalize();
console.log('打包路径：%s /example.zip', __dirname);