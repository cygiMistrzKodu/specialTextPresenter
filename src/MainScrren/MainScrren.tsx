import { useEffect, useState, useRef } from "react";
import Task from "../Task";

import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

interface TaskContent {
  content: string;
  isDone: boolean;
}

const MainScrren = () => {
  const [taskContents, setTaskContents] = useState<TaskContent[]>([]);

  const saveToStoreWhenApplicationIsClosing = () => {
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
  };
  saveToStoreWhenApplicationIsClosing();

  const readfromAutoSaveStore = () => {
    useEffect(() => {
      readAutoSave();
    }, []);
  };
  readfromAutoSaveStore();

  const makeEmptyTasksIfNone = () => {
    useEffect(() => {
      if (taskContents.length === 0) {
        const emptyTasks: TaskContent[] = [...Array(10)].map((_) => ({
          content: "",
          isDone: false,
        }));
        setTaskContents(emptyTasks);
      }
    }, [taskContents]);
  };
  makeEmptyTasksIfNone();

  const taskContentRef = useRef(taskContents);
  useEffect(() => {
    taskContentRef.current = taskContents;
  }, [taskContents]);

  const saveByCtrlPlusS = () => {
    useEffect(() => {
      const runSaveToStoreOnKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          toAutoSave();
        }
      };

      window.addEventListener("keydown", runSaveToStoreOnKeyDown);

      return () => {
        window.removeEventListener("keydown", runSaveToStoreOnKeyDown);
      };
    }, []);
  };
  saveByCtrlPlusS();

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
    const currentContents = taskContentRef.current;
    await invoke("auto_save_tasks", { taskContents: currentContents });
  };

  const readAutoSave = async () => {
    setTaskContents([]);
    const readTasks: TaskContent[] = await invoke("read_saved_tasks_contents");
    setTaskContents(readTasks);
  };

  const addTask = () => {
    setTaskContents((prevContents) => [
      ...prevContents,
      {
        content: "",
        isDone: false,
      },
    ]);
  };

  const removeLastTask = () => {
    setTaskContents((prevContents) => {
      if (prevContents.length === 0) return prevContents;

      return prevContents.slice(0, -1);
    });
  };

  const addTaskByKeyCtrlPlusD = () => {
    useEffect(() => {
      const ctrlPlusDKeyDownAddTask = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "d") {
          e.preventDefault();
          addTask();
        }
      };
      window.addEventListener("keydown", ctrlPlusDKeyDownAddTask);

      return () => {
        window.removeEventListener("keydown", ctrlPlusDKeyDownAddTask);
      };
    }, []);
  };
  addTaskByKeyCtrlPlusD();

  const resetTasks = () => {
    setTaskContents([]);
  };

  const clearAllTasks = () => {
    setTaskContents((prevContents) => {
      return prevContents.map((task) => {
        return {
          ...task,
          content: "",
          isDone: false,
        };
      });
    });
  };

  const removeEmptyTasks = () => {
    setTaskContents((prevContents) => {
      return prevContents.filter((task) => task.content !== "");
    });
  };

  const removeDoneTasks = () => {
    setTaskContents((prevContents) => {
      return prevContents.filter((task) => task.isDone !== true);
    });
  };

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto">
      <h1 className="text-3xl font-bold underline text-yellow-500 text-center">
        Zadania
      </h1>
      <div className="flex  gap-2 m-2">
        <button
          onClick={toAutoSave}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          save
        </button>
        <button
          onClick={readAutoSave}
          className="me-10 bg-gradient-to-r from-amber-500 to-amber-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          read
        </button>
        <button
          onClick={removeDoneTasks}
          className="ml-auto bg-gradient-to-r from-red-400 to-red-800 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          remove done
        </button>
        <button
          onClick={removeEmptyTasks}
          className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          remove empty
        </button>
        <button
          onClick={clearAllTasks}
          className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          clear all
        </button>
        <button
          onClick={resetTasks}
          className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          reset
        </button>
      </div>
      <div className="flex flex-wrap justify-start items-start p-2 m-1">
        {taskContents.map((taskContent, index) => (
          <Task
            key={index}
            onTaskInfoChange={(content) => taskInfoChange(index, content)}
            content={taskContent ? taskContent.content : ""}
            isTaskDone={taskContent ? taskContent.isDone : false}
            isTaskStatusChange={(taskStatus) =>
              taskStatusChange(index, taskStatus)
            }
          />
        ))}
        <div className="flex items-center justify-center  min-w-[200px] min-h-[100px] p-2 m-1 ">
          <button
            className="btn btn-outline btn-accent btn-lg"
            onClick={addTask}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <button
            className="btn btn-outline btn-secondary btn-lg ms-5"
            onClick={removeLastTask}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MainScrren;
