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

const PubSub = require("pubsub-js");

app.get("/sse", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  res.write(`data:${lightOn}\n\n`);

  PubSub.subscribe("daytime_nighttime", function(event, data) {
    res.write(`data:${lightOn}\n\n`);
  });
});
app.post("/sse", (req, res) => {
  lightOn = !lightOn;
  PubSub.publish("daytime_nighttime", lightOn.toString());
  res.send(lightOn);
});

const WebSocket = require("ws");
const ws_server = new WebSocket.Server({ port: 5000 });

const GRID_DIMENSION = 10;
const dayTimeArray = [...Array(GRID_DIMENSION)].map(x =>
  Array(GRID_DIMENSION).fill(false)
);

ws_server.on("connection", ws => {
  ws.on("message", message => {
    const { row, column, isDayTime } = JSON.parse(message);

    dayTimeArray[row][column] = isDayTime;

    ws_server.clients.forEach(client =>
      client.send(JSON.stringify(dayTimeArray))
    );
  });

  ws.send(JSON.stringify(dayTimeArray));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
