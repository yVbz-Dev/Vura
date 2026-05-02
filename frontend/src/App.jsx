import { useState } from "react";
import "./App.css";

function App() {
  const [enableGlow, setEnableGlow] = useState(true);

  return (
    <div>
      <nav>
        <p
          className={`text-center font-jetbrains font-bold text-white p-2 text-[1.3rem]
            ${enableGlow ? "text-shadow-[0_0_12px_rgba(255,255,255,0.5)]" : "text-shadow-none"}
          `}
        >
          Vura
        </p>
      </nav>
      <hr
        className={`border-t-white
          ${enableGlow ? "text-shadow-[0_0_10px_rgba(255,255,255,0.765)]" : "text-shadow-none"}
          `}
      ></hr>
      <h1
        className={`text-[2rem] text-center font-jetbrains font-black text-white p-4
          ${enableGlow ? "text-shadow-[0_0_10px_rgba(255,255,255,0.25)]" : "text-shadow-none"}
          `}
      >
        Choose your project file
      </h1>
    </div>
  );
}

export default App;
