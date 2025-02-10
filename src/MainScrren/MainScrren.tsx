import { useEffect, useState } from "react";
import Task from "../Task";

import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

interface TaskContent {
  content: string;
  isDone: boolean;
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

  const taskStatusChange = (index: number, isTaskDone: boolean) => {
    const newContents = [...taskContents];
    const content = newContents[index]?.content ?? "";
    newContents[index] = { ...newContents[index], content, isDone: isTaskDone };
    setTaskContents(newContents);
  };

  const taskInfoChange = (index: number, content: string) => {
    const newContents = [...taskContents];
    const isDone = newContents[index]?.isDone ?? false;
    newContents[index] = { ...newContents[index], content, isDone };
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
          onTaskInfoChange={(content) => taskInfoChange(0, content)}
          content={taskContents[0] ? taskContents[0].content : ""}
          isTaskDone={taskContents[0] ? taskContents[0].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(0, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(1, content)}
          content={taskContents[1] ? taskContents[1].content : ""}
          isTaskDone={taskContents[1] ? taskContents[1].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(1, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(2, content)}
          content={taskContents[2] ? taskContents[2].content : ""}
          isTaskDone={taskContents[2] ? taskContents[2].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(2, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(3, content)}
          content={taskContents[3] ? taskContents[3].content : ""}
          isTaskDone={taskContents[3] ? taskContents[3].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(3, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(4, content)}
          content={taskContents[4] ? taskContents[4].content : ""}
          isTaskDone={taskContents[4] ? taskContents[4].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(4, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(5, content)}
          content={taskContents[5] ? taskContents[5].content : ""}
          isTaskDone={taskContents[5] ? taskContents[5].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(5, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(6, content)}
          content={taskContents[6] ? taskContents[6].content : ""}
          isTaskDone={taskContents[6] ? taskContents[6].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(6, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(7, content)}
          content={taskContents[7] ? taskContents[7].content : ""}
          isTaskDone={taskContents[7] ? taskContents[7].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(7, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(8, content)}
          content={taskContents[8] ? taskContents[8].content : ""}
          isTaskDone={taskContents[8] ? taskContents[8].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(8, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(9, content)}
          content={taskContents[9] ? taskContents[9].content : ""}
          isTaskDone={taskContents[9] ? taskContents[9].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(9, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(10, content)}
          content={taskContents[10] ? taskContents[10].content : ""}
          isTaskDone={taskContents[10] ? taskContents[10].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(10, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(11, content)}
          content={taskContents[11] ? taskContents[11].content : ""}
          isTaskDone={taskContents[11] ? taskContents[11].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(11, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(12, content)}
          content={taskContents[12] ? taskContents[12].content : ""}
          isTaskDone={taskContents[12] ? taskContents[12].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(12, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(13, content)}
          content={taskContents[13] ? taskContents[13].content : ""}
          isTaskDone={taskContents[13] ? taskContents[13].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(13, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(14, content)}
          content={taskContents[14] ? taskContents[14].content : ""}
          isTaskDone={taskContents[14] ? taskContents[14].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(14, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(15, content)}
          content={taskContents[15] ? taskContents[15].content : ""}
          isTaskDone={taskContents[15] ? taskContents[15].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(15, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(16, content)}
          content={taskContents[16] ? taskContents[16].content : ""}
          isTaskDone={taskContents[16] ? taskContents[16].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(16, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(17, content)}
          content={taskContents[17] ? taskContents[17].content : ""}
          isTaskDone={taskContents[17] ? taskContents[17].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(17, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(18, content)}
          content={taskContents[18] ? taskContents[18].content : ""}
          isTaskDone={taskContents[18] ? taskContents[18].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(18, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(19, content)}
          content={taskContents[19] ? taskContents[19].content : ""}
          isTaskDone={taskContents[19] ? taskContents[19].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(19, taskStatus)}
        />
        <Task
          onTaskInfoChange={(content) => taskInfoChange(20, content)}
          content={taskContents[20] ? taskContents[20].content : ""}
          isTaskDone={taskContents[20] ? taskContents[20].isDone : false}
          isTaskStatusChange={(taskStatus) => taskStatusChange(20, taskStatus)}
        />
      </div>
    </div>
  );
};

export default MainScrren;
