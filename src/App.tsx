// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import MainScrren from "./MainScrren";

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <div>
      <MainScrren/>
    </div>
  );
}

export default App;
