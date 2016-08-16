'use strict';

const express = require('express');
// Redis
//var redis = require("redis"),
//    client = redis.createClient(32772, '192.168.99.100');

// Constants
const PORT = 8080;

// App
const app = express();
app.post('/', function (req, res) {
	//client.set("string key", "string val", redis.print);
	console.log("request=" + req.body);
	res.send('{"response":"OK"}');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);


//client.on("error", function (err) {
//    console.log("Error " + err);
//});