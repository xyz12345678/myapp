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


// --------------------------------------------
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('test.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");

console.log( __filename );
console.log( __dirname );

console.log(process);