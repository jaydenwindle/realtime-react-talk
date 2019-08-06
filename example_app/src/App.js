import React, { useState, useEffect, useRef } from "react";
import daytime from "./daytime.png";
import nighttime from "./nighttime.png";

import "./App.css";

const API_URL = "http://localhost:4000/sse";

function App() {
  const [isDayTime, setIsDayTime] = useState(true);
  const backgroundColor = isDayTime ? "#efefef" : "#212121";

  useEffect(() => {
    const eventSource = new EventSource(API_URL);
    eventSource.onmessage = event => setIsDayTime(event.data === "true");
    return () => eventSource.close();
  }, []);

  return (
    <div className="App" style={{ backgroundColor }}>
      <img
        src={isDayTime ? daytime : nighttime}
        onClick={() => fetch(API_URL, { method: "POST" })}
        alt={isDayTime ? "Daytime" : "Night time"}
      />
    </div>
  );
}

export default App;
