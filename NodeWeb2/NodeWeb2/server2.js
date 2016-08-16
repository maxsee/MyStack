//const PORT = 8080;
var express = require('express');
var myParser = require("body-parser");
var amqp = require('amqplib/callback_api');
// Redis
//var redis = require("redis"),
//    client = redis.createClient(32772, '192.168.99.100');
var app = express();
app.use(myParser.json({ extended: true }));
app.post('/', function (req, res) {
    //client.set("string key", "string val", redis.print);
    // rabbitmq
    amqp.connect('amqp://192.168.99.100:32774', function (err, conn) {
        conn.createChannel(function (err, ch) {
            var q = 'q_tasks';
            ch.assertQueue(q, { durable: false });
            ch.sendToQueue(q, new Buffer('Hello World!'));
            console.log(" [x] Sent 'Hello World!'");
        });
        //setTimeout(function () { conn.close(); process.exit(0) }, 500);
    });
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
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
//client.on("error", function (err) {
//    console.log("Error " + err);
//});
// docker run --name rabbitmq -p 32772:4369 -p 32773:5671 -p 32774:5672 -p 32775:25672 -p 15672:15672 rabbitmq:latest 
//# sourceMappingURL=server2.js.map