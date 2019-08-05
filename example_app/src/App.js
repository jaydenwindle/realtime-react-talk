import React, { useState, useEffect } from "react";
import daytime from "./daytime.png";
import nighttime from "./nighttime.png";

import "./App.css";

const API_URL = "http://localhost:4000/polling";

function App() {
  const [isDayTime, setIsDayTime] = useState(true);
  const backgroundColor = isDayTime ? "#efefef" : "#212121";

  useEffect(() => {
    setInterval(async () => {
      const response = await (await fetch(API_URL)).text();
      setIsDayTime(response === "true");
    }, 500);
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
