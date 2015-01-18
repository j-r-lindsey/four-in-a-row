function setupRoutes() {
//    app.get("/", function(req,res) {
//        res.end("foo");
//    });
//
//    app.put("/move");
//    app.put("/game");
//    app.put("/invite");
//

    app.use(express.static(__dirname));
}

function buildGameId(player,opponent) {
    return player + " vs " + opponent;
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
//            console.log("INVITE: " + JSON.stringify(json.invite));
            socket.broadcast.emit("players",JSON.stringify({ invite: json.invite }));
        } else if (json.accept) {

        }
    });

    socket.on("game",function(msg) {
        var json = JSON.parse(msg);
        if (json.start) {
            var gameId = buildGameId(json.start.player1, json.start.player2);
            var g = game.createInstance();
            g.players = [json.start.player1, json.start.player2];
            gameMap[gameId] = g;
            json.grid = g.getGrid();
            io.emit("game",JSON.stringify(json));
            console.log("New game: " + gameId);
        }
        else if (json.move) {
            var player = json.move.player;
            var opponent = json.move.opponent;

            //TODO: need to include which is which 0 or 1
            var gameId = buildGameId(player,opponent);

            var g = gameMap[gameId];
            var playerNum = (g.players[0] == player) ? 1:2;
            g.makeMove(playerNum,json.move.column);
            var winner = g.getWinner();
            if (winner > 0) {
                io.emit("game",JSON.stringify({grid: g.getGrid(), winner: g.players[winner-1]}));
            } else {
                io.emit("game",JSON.stringify({grid: g.getGrid(), turn: opponent}));
            }
        }
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
var gameMap = {};
var game = require("./game-engine.js");

setupRoutes();
httpserv.listen(port, host);

io.on("connection",handleSocket);


