import { useState } from "react";
import "./App.css";
import Welcome from "./components/welcome.jsx";
import Editor from "./components/editor.jsx";
import VuraConfigProvider from "./VuraConfig.jsx"

function App() {
  const [editor, setEditor] = useState(false);
  const [fileData, setFileData] = useState(null);
  // oi mate
  // another line mate

  return (
    <VuraConfigProvider>
      {editor ? (
        <Editor FileData={fileData} />
      ) : (
        <Welcome
          content={(Content) => {
            setFileContent(Content);
          }}
          editor={() => {
            setEditor(true);
          }}
          fileData={(FileData) => {
            setFileData(FileData);
          }}
        />
      )}

    </VuraConfigProvider>
  );
}

export default App;
