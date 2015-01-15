function setupRoutes() {
//    app.get("/", function(req,res) {
//        res.end("foo");
//    });

    app.use(express.static(__dirname));
}

function handleSocket(socket) {
//    socket.on("disconnect",function() {
//        //kill game?
//    });

    socket.on("players",function(msg) {
        var json = JSON.parse(msg);
        if (json.playerName) {
            availablePlayers.push(json.playerName);
            //console.log(availablePlayers);
            io.emit("players",JSON.stringify({ availablePlayers: availablePlayers }));
        } else if (json.invite) {
            console.log("INVITE: " + JSON.stringify(json.invite));
            socket.broadcast.emit("players",JSON.stringify({ invite: json.invite }));
        }
    });

    socket.on("game",function(msg){
        io.emit("game","new game: " + msg);
    });
}

var express = require("express");
var app = express();
var http = require("http");
var httpserv = http.createServer(app);

var io = require("socket.io")(httpserv);

var port = 8006;
var host = "127.0.0.1";

var availablePlayers = [];

setupRoutes();
httpserv.listen(port, host);

io.on("connection",handleSocket);


