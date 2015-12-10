var fs = require("fs"),
  path = require("path"),
  url = require("url");


var modRewrite  = require('connect-modrewrite');

var defaultFile = "index.html"

// I had to resolve to the previous folder, because this task lives inside a ./tasks folder
// If that's not your case, just use `__dirname`
var folder = path.resolve(__dirname, "./");

module.exports = {
    "ui": {
        "port": 3001,
        "weinre": {
            "port": 8081
        }
    },
    "files": ["./dist/*.css", "./dist/*.js", "./index.html"],
    "watchOptions": {},
    "server": {
    baseDir: "./",
    middleware: [
        function(req, res, next) {
            var fileName = url.parse(req.url);
            fileName = fileName.href.split(fileName.search).join("");
            var isResource = ['.js', '.css', '.jpg'].some(function(ext) {
                return path.extname(req.url) == ext;
            });
            var fileExists = fs.existsSync(folder + fileName);
            if (path.basename(req.url) == 'login') {
                req.url = '/login.html';
            } else if (isResource) {
                fileName = '/dist/' + path.basename(req.url);
                req.url = fileName;
            } else if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                req.url = "/" + defaultFile;
            }
            return next();
        }
    ]
    },
    "proxy": false,
    "port": 3000
};