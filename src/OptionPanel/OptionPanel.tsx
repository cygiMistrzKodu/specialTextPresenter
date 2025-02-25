import { useEffect } from "react";
import { TaskContent } from "../types";

interface OptionPanelProps {
  taskContents: TaskContent[];
  setTaskContents: React.Dispatch<React.SetStateAction<TaskContent[]>>
}

const OptionPanel = ({ taskContents , setTaskContents }: OptionPanelProps) => {

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
    <div className="flex gap-2">
     <button
          onClick={removeDoneTasks}
          className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 py-2 rounded-lg shadow-lg
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
  )
}

export default OptionPanel;
