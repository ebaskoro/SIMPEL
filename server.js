/*
 * server.js
 */
 
var express = require("express");
var app = express();
var http = require("http");
var https = require("https");
var less = require("less-middleware");
var path = require("path");
var fs = require("fs");
var mysql = require("mysql");

app.configure("development", function () {
    app.use(less(path.join(__dirname, "src", "less"), {
        dest: path.join(__dirname, "public"),
        preprocess: {
            path: function (pathname, request) {
                return pathname.replace('\\css\\', '\\');
            }
        }
    }));
    
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, "public")));
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "jade");
});

var server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app);

require("./routes/home")(app);

var connection = mysql.createConnection({
    host: "localhost",	//  your host here
    database: "",   	// use your database
    user: "",			// use your username
    password: ""		// use your password
});

require("./routes/account")(app, connection);
require("./routes/api")(app, connection);

server.listen(443);

console.log("Server is running");