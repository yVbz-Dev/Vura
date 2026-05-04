import { useState } from "react";
import "../App.css"; 
import { Panel, Group, Separator } from "react-resizable-panels";
import React from "react";
import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { whiteDark } from "@uiw/codemirror-theme-white";

function Editor() {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <nav
        className="bg-[#121212]
        flex items-stretch flex-row h-10
        border-b-[2px] border-white/50 w-full"
      >
        <h3
          className="font-jetbrains text-white font bg-none
          flex items-center justify-center pl-2 pr-2
          "
        >
          Vura
        </h3>
        <div className="flex w-full items-center flex-row ml-2 \h-full">
          <div className="h-full">
            <p
              className="font-jetbrains text-white border-l border-r
              border-white/90 h-full w-full pl-2 pr-2 text-center
              flex items-center justify-center"
            >
              editor.jsx {"\uea76"}
            </p>
          </div>
          <div className="h-full">
            <p
              className="font-jetbrains text-white border-l border-r
              border-white/90 h-full w-full pl-2 pr-2 text-center
              flex items-center justify-center"
            >
              welcome.jsx {"\uea76"}
            </p>
          </div>
        </div>
      </nav>
      <Group>
        <Panel minSize={600}>
          <div className="h-full w-full flex flex-row items-center">
            <CodeMirror
              value={value}
              height="100vh"
              width="100vw"
              theme={oneDark}
              style={{
                height: "100vh",
                width: "100vw",
              }}
              extensions={[javascript({ jsx: true })]}
              onChange={onChange}
            />
          </div>
        </Panel>
        <Separator className="border-white/50 border-[0.1px]" />
        <Panel minSize={100}>
          <div className="bg-[#121212]"></div>
        </Panel>
      </Group>
    </div>
  );
}

export default Editor;
