import { useEffect, useState } from "react";
import Task from "../Task";

import { invoke } from "@tauri-apps/api/core";

interface TaskContent {
  content: string;
}

const MainScrren = () => {
  useEffect(() => {
    console.log(`MainScrren mounted`);
  }, []);

  const [taskContents, setTaskContents] = useState<TaskContent[]>([]);

  const taskInfoChange = (index: number, content: string) => {
    const newContents = [...taskContents];
    newContents[index] = { content };
    setTaskContents(newContents);
  };

  const toAutoSave = async () => {

    
    await invoke("auto_save_tasks", { taskContents });

    console.log(taskContents);
  };

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto">
      <h1 className="text-3xl font-bold underline text-yellow-500 text-center">
        Wpisuj swój tekst
      </h1>
      <div className="flex flex-wrap justify-start items-start p-2 m-1">
        <Task onChange={(content) => taskInfoChange(0, content)} />
        <Task onChange={(content) => taskInfoChange(1, content)} />
        <Task onChange={(content) => taskInfoChange(2, content)} />
        <Task onChange={(content) => taskInfoChange(3, content)} />
        <Task onChange={(content) => taskInfoChange(4, content)} />
        {/* <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task /> */}
      </div>
      <button
        onClick={toAutoSave}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
      >
        Test do zapisu na backend
      </button>
    </div>
  );
};

export default MainScrren;
