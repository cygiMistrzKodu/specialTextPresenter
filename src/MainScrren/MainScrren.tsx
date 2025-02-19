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
    const currentTasks = taskContentRef.current;

    const tasksWithTrimmedContents = currentTasks.map((task) => ({
      ...task,
      content: task.content.trim(),
    }));

    await invoke("auto_save_tasks", { taskContents: tasksWithTrimmedContents });
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
      return prevContents.filter((task) => task.content.trim() !== "");
    });
  };

  const removeDoneTasks = () => {
    setTaskContents((prevContents) => {
      return prevContents.filter((task) => task.isDone !== true);
    });
  };

  const [toDoTasksCount, setToDoTaskCount] = useState<number>(0);

  const countToDoTasks = (tasks: TaskContent[]): number => {
    return tasks.filter((task) => task.isDone === false && task.content !== "")
      .length;
  };

  const [doneTasksCount, setDoneTasksCount] = useState<number>(0);

  const countDoneTasks = (tasks: TaskContent[]): number => {
    return tasks.filter((task) => task.isDone === true && task.content !== "")
      .length;
  };

  const [emptyTasksCount, setEmptyTasksCount] = useState<number>(0);

  const countEmptyTasks = (tasks: TaskContent[]): number => {
    return tasks.filter((task) => task.content === "").length;
  };

  const [allTaskCount, setAllTaskCount] = useState<number>(0);

  const countAllTasks = (tasks: TaskContent[]): number => {
    return tasks.length;
  };

  useEffect(() => {
    setToDoTaskCount(countToDoTasks(taskContents));
    setDoneTasksCount(countDoneTasks(taskContents));
    setEmptyTasksCount(countEmptyTasks(taskContents));
    setAllTaskCount(countAllTasks(taskContents));
  }, [taskContents]);

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold underline text-yellow-500 text-center">
          Tasks
        </h1>
        <div className="ms-6">
          <span className="countdown font-mono text-4xl bg-gradient-to-r from-black to-blue-700">
            ToDo:{toDoTasksCount}
          </span>
          <span className="countdown font-mono text-4xl ms-6 bg-gradient-to-r from-black to-rose-800">
            Done:{doneTasksCount}
          </span>
          <span className="countdown font-mono text-4xl ms-6 bg-gradient-to-r from-black to-lime-800">
            Empty:{emptyTasksCount}
          </span>
          <span className="countdown font-mono text-4xl ms-6 bg-gradient-to-r from-black to-green-700">
            all:{allTaskCount}
          </span>
        </div>
      </div>
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
