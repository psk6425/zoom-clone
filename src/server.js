import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views",__dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home.pug"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http:localhost:3000`);

const server =  http.createServer(app);
const wss = new WebSocket.Server({ server });
function onSocketClose() {
    console.log("Disconnected from the Browser❌");
}

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser✅");
    socket.on("close", onSocketClose);
    socket.on("message", (message) => { 
        sockets.forEach((aSocket) => aSocket.send(message.toString('utf-8')));
    });
});

server.listen(3000, handleListen);


//backend 부분