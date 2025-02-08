import { useEffect, useState } from "react";
import Task from "../Task";

import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

interface TaskContent {
  content: string;
}

const MainScrren = () => {
  const [taskContents, setTaskContents] = useState<TaskContent[]>([]);

  useEffect(() => {
    const closeHandler = async () => {
      await toAutoSave();
      await getCurrentWindow().destroy();
    };

    const unlisten = getCurrentWindow().onCloseRequested(closeHandler);

    return () => {
      unlisten.then((fn) => fn());
    };
  }, [taskContents]);

  useEffect(() => {
    readAutoSave();
  }, []);

  const saveByCtrlPlustS = () => {
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          toAutoSave();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
    }, [taskContents]);
  };

  saveByCtrlPlustS();

  const taskInfoChange = (index: number, content: string) => {
    const newContents = [...taskContents];
    newContents[index] = { content };
    setTaskContents(newContents);
  };

  const toAutoSave = async () => {
    await invoke("auto_save_tasks", { taskContents });
  };

  const readAutoSave = async () => {
    setTaskContents([]);
    const readTasks: TaskContent[] = await invoke("read_saved_tasks_contents");
    setTaskContents(readTasks);
  };
  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto">
      <h1 className="text-3xl font-bold underline text-yellow-500 text-center">
        Wpisuj swój tekst
      </h1>
      <div className="flex  gap-2 m-2">
        <button
          onClick={toAutoSave}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          Test zapisu
        </button>
        <button
          onClick={readAutoSave}
          className="bg-gradient-to-r from-amber-500 to-amber-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          Test odczytu
        </button>
      </div>
      <div className="flex flex-wrap justify-start items-start p-2 m-1">
        <Task
          onChange={(content) => taskInfoChange(0, content)}
          setContent={taskContents[0] ? taskContents[0].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(1, content)}
          setContent={taskContents[1] ? taskContents[1].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(2, content)}
          setContent={taskContents[2] ? taskContents[2].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(3, content)}
          setContent={taskContents[3] ? taskContents[3].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(4, content)}
          setContent={taskContents[4] ? taskContents[4].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(5, content)}
          setContent={taskContents[5] ? taskContents[5].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(6, content)}
          setContent={taskContents[6] ? taskContents[6].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(7, content)}
          setContent={taskContents[7] ? taskContents[7].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(8, content)}
          setContent={taskContents[8] ? taskContents[8].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(9, content)}
          setContent={taskContents[9] ? taskContents[9].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(10, content)}
          setContent={taskContents[10] ? taskContents[10].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(11, content)}
          setContent={taskContents[11] ? taskContents[11].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(12, content)}
          setContent={taskContents[12] ? taskContents[12].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(13, content)}
          setContent={taskContents[13] ? taskContents[13].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(14, content)}
          setContent={taskContents[14] ? taskContents[14].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(15, content)}
          setContent={taskContents[15] ? taskContents[15].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(16, content)}
          setContent={taskContents[16] ? taskContents[16].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(17, content)}
          setContent={taskContents[17] ? taskContents[17].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(18, content)}
          setContent={taskContents[18] ? taskContents[18].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(19, content)}
          setContent={taskContents[19] ? taskContents[19].content : ""}
        />
        <Task
          onChange={(content) => taskInfoChange(20, content)}
          setContent={taskContents[20] ? taskContents[20].content : ""}
        />
      </div>
    </div>
  );
};

export default MainScrren;
