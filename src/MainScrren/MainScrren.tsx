import { useEffect, useState } from "react";
import Task from "../Task";

import { TaskContent } from "../types";

import TaskCountStatistic from "../TaskCountStatistic";
import AddRemoveTaskPanel from "../AddRemoveTaskPanel";
import StorePanel from "../StorePanel";

const MainScrren = () => {
  const [taskContents, setTaskContents] = useState<TaskContent[]>([]);

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

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto">
      <TaskCountStatistic tasks={taskContents} />
      <div className="flex  gap-2 m-2">
        <StorePanel
          taskContents={taskContents}
          setTaskContents={setTaskContents}
        />
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
        <AddRemoveTaskPanel setTaskContents={setTaskContents} />
      </div>
    </div>
  );
};
export default MainScrren;
