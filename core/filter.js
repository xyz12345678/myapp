var fs = require('fs');
var path = require('path');
module.exports = function(app) {
	// 读取当前路径下所有controller process.cwd()
	var filterDir = path.join(process.cwd(), 'app/filters');
	var files = fs.readdirSync(filterDir);
	for (var i in files) {
		var filename = files[i];
		var filter = require(path.join(filterDir, filename));
		filter(app);
	}
};