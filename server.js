var http = require("http");
var http = require("http");
var Datastore = require('nedb');
var qs = require("querystring");
var fs = require("fs");
var path = require("path");
var db = new Datastore({
	filename: 'data/database.db'
});

db.loadDatabase(function (err) {    // Callback is optional
	// Now commands will be executed
  });


function insertIntoDb(req,res){
	var allData = "";

	req.on("data", function(data) {
		//console.log("data: " + data)
		allData += data;
	})

	req.on("end", function(data) {
		var finish = qs.parse(allData)
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();		

		finish.date = hours + ":" + minutes;
		finish.timestamp =  date.getTime();

		db.insert(finish, function(err, newDoc){});	
		res.end("Wiadomosc wrzucona do bazy") 

	})

}

function sendMsgToClient(req,res){
	var allData = "";

	req.on("data", function(data) {
		//console.log("data: " + data)
		allData += data;
	})

	req.on("end", function(data) {
		var finish = qs.parse(allData)
		var oldTimestamp = parseInt(finish.oldTimestamp);

		db.find({"timestamp":{$gt: oldTimestamp}}, function(err, docs){
			responseToClient = docs;
			res.end(JSON.stringify(responseToClient)) 			
		})	

	})


}


http.createServer(function (req, res) {
	//console.log(req.url)
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
		fs.readFile("static/index.html", function (error, data) {
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			res.write(data);
			res.end();
		})
	} else if (url == "/pool") {
		switch (req.method) {
			case "POST":	
				sendMsgToClient(req,res)			
				break;
			case "GET":
				break;
		}
	} else if (url == "/sendMsg") {
		switch (req.method) {
			case "POST":
				insertIntoDb(req,res);
				break;
			case "GET":
				break;
		}

	} else {
		fs.readFile("static" + url, function (error, data) {
			res.writeHead(200, {
				'Content-Type': contentType
			});
			res.write(data);
			res.end();
		})
	}
}).listen(3000);

