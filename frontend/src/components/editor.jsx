import { useState } from "react";
import "../App.css";
import { Panel, Group, Separator } from "react-resizable-panels";
import React from "react";
import CodeMirror, { oneDark } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp"
import { EditorView } from "@uiw/react-codemirror";
import Tab from "./AppComponents/tab";
import { useEffect } from "react";
import { useContext } from "react";
import { VuraConfigContext } from "../VuraConfig";
import { vim } from "@replit/codemirror-vim";
import App from "../App";

const extensionsName = {
  ".js": () => javascript({ jsx: true, typescript: true }),
  ".rs": () => rust(),
  ".cpp": () => cpp(),
  ".jsx": () => javascript({ jsx: true, typescript: true }),
  ".ts": () => javascript({ jsx: true, typescript: true }),
}

function Editor(props) {
  const currTab = {
    Content: props.FileData.Content,
    Name: props.FileData.Name,
    Path: props.FileData.Path,
  };
  const { Config, UpdateConfig } = useContext(VuraConfigContext)
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
      const err = await window.go.main.App.SaveFile(FileData);
      if (err) {
        window.runtime.SendNotification({
          ID: "Fail Notification",
          Title: "Fail saving notification!",
          Body: "Error: " + err.toString()
        })
      }
    } catch (err) {
      window.runtime.SendNotification({
        ID: "Fail Notification",
        Title: "Fail saving notification!",
        Body: "Error: " + err.toString()
      })
    }
  };

  // bind save logic
  useEffect(() => {
    const saveBind = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        console.log(tabs[activeTab.Path]);
        saveFile(tabs[activeTab.Path]);
      }
    };

    window.addEventListener("keydown", saveBind);
    return () => window.removeEventListener("keydown", saveBind);
  }, [tabs, activeTab]);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <nav
        className="bg-[#121212] fixed z-10
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
          {
            Object.values(tabs || {}).map((tab) => {
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
            className="m-4 p-2 font-jetbrains text-white "
            onClick={async (e) => {
              // open tab
              const fileData = await window.go.main.App.SelectFolder();
              if (fileData && fileData.Path != "") {
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
              } else {
                window.runtime.SendNotification({
                  ID: "Fail Notification",
                  Title: "File not found",
                  Body: "The file does not exists!"
                })
              }
            }}
          >
            {"\uf067"}
          </button>
          <div className="mt-[4.35rem] bg-[#151515] p-0.5 w-full self-center grow pr-5 flex fixed -mx-16 z-8 flex-col items-center m-[0.1rem]">
            <p className="font-jetbrains text-center text-white">{activeTab.Name}</p>
          </div>
        </div>
      </nav>
      <Group>
        <Panel minSize={600}>
          <div className="overflow-scroll mt-16 w-full flex flex-col items-center">
            <CodeMirror
              value={activeTab.Content}
              height="100vh"
              width="100vw"
              theme={VuraTheme}
              onChange={(value) => {
                setTabs((prev) => {
                  if (!prev) [];

                  return {
                    ...prev,
                    [activeTab.Path]: {
                      ...prev[activeTab.Path],
                      Content: value
                    }
                  }
                })
                return value
              }}
              style={{
                height: "100vh",
                width: "100vw",
              }}
              extensions={[oneDark, Config.VimMode ? vim() : [], (extensionsName[getFileExtension(activeTab.Name)] || (() => []))()]}
            />
          </div>
        </Panel>
      </Group>
    </div>
  );
}

function getFileExtension(fileName) {
  console.log(fileName, fileName.slice(fileName.lastIndexOf(".")).toLowerCase())
  return fileName.slice(fileName.lastIndexOf(".")).toLowerCase()
}

export default Editor;
