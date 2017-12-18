var fs = require('fs');
var path = require('path');
var util = require('../app/utils/utils');
module.exports = function(app) {
	// 读取当前路径下所有controller process.cwd()
	var controllerDir = path.join(process.cwd(), 'app/routes');
	var files = fs.readdirSync(controllerDir);
	for (var i in files) {
		var filename = files[i];
		if(filename == "api"){
			var apiFiles = fs.readdirSync(path.join(process.cwd(), 'app/routes/api'));
			for (var i in apiFiles) {
				var apifilename = apiFiles[i];
				var controller = require(path.join(controllerDir, filename));
				app.use(util.appendContextPath(controller.requestMapping), controller.router);
			}
		}else{
			var controller = require(path.join(controllerDir, filename));
			app.use(util.appendContextPath(controller.requestMapping), controller.router);
		}
		
	}
};