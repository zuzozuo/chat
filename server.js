var http = require("http");
var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var path = require("path");


http.createServer(function(req, res) {
	console.log(req.url)
	var url = req.url,
		ext = path.extname(url),
		contentType;

	if (ext == ".js") {
		contentType = "application/javascript";
	} else if (ext == ".css") {
		contentType = "text/css";
	} else if (ext == ".html") {
		contentType = "text/html";
	} else if (ext == ".jpg") {
		contentType = "image/jpeg";
	} else if (ext == ".png") {
		contentType = "image/png";
	} else if (ext == ".woff") {
		contentType = "application/font-woff";
	}

	if (url == "/") {
		fs.readFile("static/index.html", function(error, data) {
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			res.write(data);
			res.end();
		})
	} else if (url == "/ajax") {
		switch (req.method) {
			case "POST":
				//getData(req, res);
				break;
			case "GET":
				//loadCards(req, res);
				break;
			case "PUT":
				//updateCards(req, res);
				break;
			case "DELETE":
				//removeCard(req, res);
				break;
		}
	} else {
		fs.readFile("static" + url, function(error, data) {
			res.writeHead(200, {
				'Content-Type': contentType
			});
			res.write(data);
			res.end();
		})
	}

	//console.log("Start na porcie")
}).listen(3000);

