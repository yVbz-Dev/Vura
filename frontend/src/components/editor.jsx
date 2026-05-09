import { useState } from "react";
import "../App.css";
import { Panel, Group, Separator } from "react-resizable-panels";
import React from "react";
import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { whiteDark } from "@uiw/codemirror-theme-white";
import { EditorView } from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";
import Tab from "./AppComponents/tab";
import { useEffect } from "react";
import App from "../App";

function Editor(props) {
  const currTab = {
    Content: props.FileData.Content,
    Name: props.FileData.Name,
    Path: props.FileData.Path,
  };
  const [activeTab, setActiveTab] = useState(currTab);
  const [tabs, setTabs] = useState({ [currTab.Path]: currTab });
  const VuraTheme = EditorView.theme(
    {
      // O "&" representa o container principal do editor
      "&": {
        color: "white",
        backgroundColor: "#0a0a0a", // Aqui você controla o "pretão" (000000 é total black)
      },
      // A área onde o texto realmente fica
      ".cm-content": {
        caretColor: "#ae81ff", // Cor do cursor (um roxinho fica massa)
        fontFamily: "'JetBrains Mono', monospace",
      },
      // A "calha" onde ficam os números das linhas
      ".cm-gutters": {
        backgroundColor: "#0a0a0a", // Deixa igual ao fundo pra não ter divisão feia
        color: "#454545", // Cor dos números das linhas (mais discreto)
        border: "none", // Remove aquela borda padrão chata
      },
      // Cor da linha ativa (onde o cursor está)
      ".cm-activeLine": {
        backgroundColor: "#151515",
      },
      // Cor dos números na linha ativa
      ".cm-activeLineGutter": {
        backgroundColor: "#151515",
        color: "white",
      },
    },
    { dark: true },
  );

  // save file logic
  const saveFile = async (FileData) => {
    try {
      await window.go.main.App.SaveFile(FileData);
    } catch (err) {
      alert("Error saving file: ", err);
    }
  };

  // bind save logic
  useEffect(() => {
    const saveBind = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        console.log(activeTab);
        saveFile(activeTab);
      }
    };

    window.addEventListener("keydown", saveBind);
    return () => window.removeEventListener("keydown", saveBind);
  }, [tabs, activeTab]);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <nav
        className="bg-[#121212]
        flex items-stretch flex-row h-10
        border-b border-white/50 w-full"
      >
        <h3
          className="font-jetbrains text-white font bg-none
          flex items-center justify-center pl-2 pr-2
          "
        >
          Vura
        </h3>
        <div className="flex w-full items-center flex-row ml-2 \h-full">
          {Object.values(tabs).map((tab) => {
            return (
              <Tab
                onMouseDown={(e) => {
                  e.preventDefault()
                  if (e.button == 0) {
                    setActiveTab(tab)
                  } else if (e.button == 2) {
                    // close tab
                    const {
                      [tab.Path]: _, ...otherTabs
                    } = tabs
                    setTabs(otherTabs)
                    if (tab.Path == activeTab.Path) {
                      const tabsObject = Object.keys(otherTabs)
                      const lastPath = tabsObject.at(-1)
                      setActiveTab(otherTabs[lastPath])
                    }
                  }
                }}
                key={tab.Path}
                fileName={tab.Name}
              ></Tab>
            );
          })}
          <button
            className="m-4 font-jetbrains text-white "
            onClick={async (e) => {
              // open tab
              const fileData = await window.go.main.App.SelectFolder();
              if (fileData) {
                const newTabs = {
                  ...tabs,
                  [fileData.Path]: {
                    Name: fileData.Name,
                    Content: fileData.Content,
                    Path: fileData.Path,
                  }
                }
                setTabs(newTabs);
                setActiveTab(newTabs[fileData.Path]);
              }
            }}
          >
            {"\uf067"}
          </button>
        </div>
      </nav>
      <Group>
        <Panel minSize={600}>
          <div className="h-full w-full flex flex-col items-center">
            <div className="w-full h-6 flex flex-col items-center m-[0.1rem]">
              <p className="font-jetbrains text-white">{activeTab.Name}</p>
            </div>
            <CodeMirror
              value={activeTab.Content}
              height="100vh"
              width="100vw"
              theme={VuraTheme}
              onChange={(value) => {
                activeTab.Content = value;
                setTabs((prev) =>
                  prev.map((t) => {
                    if (t.ID == activeTab.ID) {
                      return {
                        ID: activeTab.ID,
                        Content: value,
                        Name: activeTab.Name,
                        Path: activeTab.Path,
                      };
                    }
                    return t;
                  }),
                );
              }}
              style={{
                height: "100vh",
                width: "100vw",
              }}
              extensions={[oneDark, javascript({ jsx: true })]}
            />
          </div>
        </Panel>
      </Group>
    </div>
  );
}

export default Editor;
