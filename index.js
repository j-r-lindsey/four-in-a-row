function setupRoutes() {
    app.get("/", function(req,res) {
        res.end("nothing to see here");
    });

    app.use(express.static(__dirname));
}

function handleSocket(socket) {
    socket.on("disconnect",function() {
        console.log("client disconnected.");
        //clearInterval(intv);
    });

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

var
    express = require("express"),
    app = express(),
	http = require("http"),
	httpserv = http.createServer(app),

    io = require("socket.io")(httpserv),

	port = 8006,
	host = "127.0.0.1",

    availablePlayers = []
;

setupRoutes();
httpserv.listen(port, host);

io.on("connection",handleSocket);


