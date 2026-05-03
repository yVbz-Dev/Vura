import { useState } from "react";
import "./App.css";

function App() {
  const [enableGlow, setEnableGlow] = useState(true);

  return (
    <div>
      <nav className="bg-[#121212] w-full h-full">
        <p
          className={`text-center font-jetbrains font-bold text-white p-2 text-[1.3rem]
            ${enableGlow ? "text-shadow-[0_0_4px_rgba(255,255,255,0.2)]" : "text-shadow-none"}
          `}
        >
          Vura
        </p>
      </nav>
      <hr
        className={`border-t-white  mb-3
          ${enableGlow ? "shadow-[0_0_6px_rgba(255,255,255,0.3)]" : "shadow-none"}
          `}
      ></hr>
      <h1
        className={`text-[2rem] text-center font-jetbrains font-black text-white p-4 mt-3
          ${enableGlow ? "text-shadow-[0_0_4px_rgba(255,255,255,0.15)]" : "text-shadow-none"}
          `}
      >
        Choose your project file
      </h1>

      <div className="flex items-center justify-center mt-15">
        <button
          className={`text-[1.5rem] text-white font-jetbrains font-bold p-4 rounded-md border
          ${enableGlow ? "text-shadow-[0_0_4px_rgba(255,255,255,0.15)] shadow-[0_0_4px_rgba(255,255,255,0.2)]" : "text-shadow-none shadow-none"}
          duration-300 transition-all
          hover:-translate-y-0.5
          `}
          onClick={(e) => {
            const filePath = window.go.main.App.SelectFolder();
            if (filePath) {
            }
          }}
        >
          {"\uea80"} Choose your folder
        </button>
      </div>

      <div className="mt-125 bg-[#121212] h-[150vh]">
        <hr
          className={`border-t-white mb-3
            ${enableGlow ? "shadow-[0_0_4px_rgba(255,255,255,0.3)]" : "shadow-none"}
            `}
        ></hr>

        <div className="flex items-center justify-center flex-col m-5">
          <h1
            className={`text-white font-jetbrains font-bold text-3xl m-1
            ${enableGlow ? "text-shadow-[0_0_2px_rgba(255,255,255,0.2)]" : "text-shadow-none"}
            `}
          >
            About Vura
          </h1>
          <p
            className={`text-white font-jetbrains font-bold m-1 text-center
          `}
          >
            Vura is a lightweight, high-performance IDE built for developers who
            value speed and a distraction-free workflow. Engineered with Go and
            React via Wails, it brings a native-feeling experience directly to
            your Linux environment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
