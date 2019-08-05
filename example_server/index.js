const express = require("express");
var cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());

let lightOn = false;

app.get("/polling", (req, res) => res.send(lightOn));
app.post("/polling", (req, res) => {
  lightOn = !lightOn;
  res.send(lightOn);
});

const EventEmitter = require("events");
const Stream = new EventEmitter();

app.get("/sse", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  res.write(`data:${lightOn}\n\n`);

  Stream.on("switch", function(event, data) {
    res.write(`data:${lightOn}\n\n`);
  });
});
app.post("/sse", (req, res) => {
  lightOn = !lightOn;
  Stream.emit("switch", lightOn.toString());
  res.send(lightOn);
});

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 5000 });

wss.on("connection", ws => {
  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    lightOn = message === "true";
    Stream.emit("switch", lightOn);
  });

  Stream.on("switch", function(event, data) {
    ws.send(lightOn);
  });

  ws.send(lightOn);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
