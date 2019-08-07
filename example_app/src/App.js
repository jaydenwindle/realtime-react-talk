import React, { useState, useEffect } from "react";
import daytime from "./daytime.png";
import nighttime from "./nighttime.png";
import { w3cwebsocket as WebSocket } from "websocket";

import "./App.css";

const API_URL = "ws://localhost:5000";
const client = new WebSocket(API_URL);

function App() {
  const GRID_DIMENSION = 10;
  const [isDayTimeArray, setIsDayTimeArray] = useState(
    [...Array(GRID_DIMENSION)].map(x => Array(GRID_DIMENSION).fill(false))
  );

  useEffect(() => {
    client.onmessage = async event => setIsDayTimeArray(JSON.parse(event.data));
  }, []);

  return (
    <div className="App">
      {isDayTimeArray.map((row, rowIndex) => (
        <div>
          {row.map((isDayTime, columnIndex) => (
            <div
              className="column"
              style={{
                padding: 15,
                backgroundColor: isDayTime ? "#fff" : "#222"
              }}
            >
              <img
                src={isDayTime ? daytime : nighttime}
                onClick={() =>
                  client.send(
                    JSON.stringify({
                      row: rowIndex,
                      column: columnIndex,
                      isDayTime: !isDayTime
                    })
                  )
                }
                alt={isDayTime ? "Daytime" : "Night time"}
                style={{ width: 110, height: "auto" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
