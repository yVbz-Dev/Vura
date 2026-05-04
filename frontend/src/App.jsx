import { useState } from "react";
import "./App.css";
import Welcome from "./components/welcome.jsx";
import Editor from "./components/editor.jsx";

function App() {
  const [editor, setEditor] = useState(false);

  return <>{editor ? <Editor /> : <Welcome editor={()=>{
    setEditor(true)
  }} />}</>;
}

export default App;
