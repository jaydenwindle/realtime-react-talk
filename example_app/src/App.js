import React, { useState } from "react";
import daytime from "./daytime.png";
import nighttime from "./nighttime.png";
import "./App.css";

function App() {
  const [isDayTime, setIsDayTime] = useState(true);

  return (
    <div
      className="App"
      style={{ backgroundColor: isDayTime ? "#efefef" : "#212121" }}
    >
      <img
        src={isDayTime ? daytime : nighttime}
        onClick={() => setIsDayTime(!isDayTime)}
        alt={isDayTime ? "Daytime" : "Night time"}
      />
    </div>
  );
}

export default App;
