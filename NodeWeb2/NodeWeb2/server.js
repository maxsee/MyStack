//import http = require('http');
//var port = process.env.port || 1337
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);
var PORT = 8080;
var q = 'q_tasks';
var express = require('express');
var myParser = require("body-parser");
var amqp = require('amqplib/callback_api');
var rabbitChannel;
// rabbitmq
//amqp.connect('amqp://192.168.99.100:32794', function (err, conn) {
amqp.connect('amqp://192.168.99.100:32800', function (err, conn) {
    if (err != null)
        bail(err);
    conn.createChannel(on_open);
    function on_open(err, ch) {
        rabbitChannel = ch;
    }
    //setTimeout(function () { conn.close(); process.exit(0) }, 500);
});
// Redis
//var redis = require("redis"),
//    client = redis.createClient(32772, '192.168.99.100');
var app = express();
app.use(myParser.json({ extended: true }));
app.post('/', function (req, res) {
    //client.set("string key", "string val", redis.print);
    publisher(rabbitChannel);
    console.log("request=" + req.body.user_id);
    res.send('{"response":"POST-OK"}');
    res.end();
});
app.get('/', function (req, res) {
    //client.set("string key", "string val", redis.print);
    console.log("request=" + req.querystring);
    res.send('{"response":"GET-OK"}');
    res.end();
});
function bail(err) {
    console.error(err);
    process.exit(1);
}
// RabbitMQ publisher 
function publisher(ch) {
    ch.assertQueue(q, { durable: false });
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
}
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
//client.on("error", function (err) {
//    console.log("Error " + err);
//});
// docker run --name rabbitmq -p 32772:4369 -p 32773:5671 -p 32774:5672 -p 32775:25672 -p 15672:15672 rabbitmq:latest
// docker run --name rabbitmq2 -p 32782:4369 -p 32783:5671 -p 32784:5672 -p 32785:25672 -p 15682:15672 rabbitmq:latest
// docker run --name rabbitmq3 -p 32792:4369 -p 32793:5671 -p 32794:5672 -p 32795:25672 -p 15692:15672 rabbitmq:latest
// rabbitmq-plugins enable rabbitmq_management
// create linked nodes of RabbitMQ
// docker run -d --hostname rabbit1 --name rabbitmq1 -p 32772:4369 -p 32773:5671 -p 32774:5672 -p 32775:25672 -p 15671:15671 -p 15672:15672 -e RABBITMQ_ERLANG_COOKIE='xaxaxa' rabbitmq:3-management
// docker run -d --hostname rabbit2 --name rabbitmq2 --link rabbitmq1 -p 32782:4369 -p 32783:5671 -p 32784:5672 -p 32785:25672 -p 15681:15671 -p 15682:15672 -e RABBITMQ_ERLANG_COOKIE='xaxaxa' rabbitmq:3-management
// docker run -d --hostname rabbit3 --name rabbitmq3 --link rabbitmq1 --link rabbitmq2 -p 32792:4369 -p 32793:5671 -p 32794:5672 -p 32795:25672 -p 15691:15671 -p 15692:15672 -e RABBITMQ_ERLANG_COOKIE='xaxaxa' rabbitmq:3-management
// https://www.rabbitmq.com/clustering.html
// create nginx
// docker run -d --name nginx1 -p 32800:32800 -p 32801:32801 nginx: latest
// change config
// docker cp c:/tmp/nginx.conf nginx1:/etc/nginx
// http://stackoverflow.com/questions/30853247/how-to-edit-file-after-i-shell-to-a-docker-container
// /etc/nginx/nginx.conf
//# sourceMappingURL=server.js.map