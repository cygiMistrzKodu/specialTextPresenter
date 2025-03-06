import { useEffect } from "react";
import { TaskContent } from "../types";
import RemoveDoneTask from "../RemoveDoneTask";
import RemoveEmptyTask from "../RemoveEmptyTask";
import ClearAllTask from "../ClearAllTask";
import ResetTasks from "../ResetTasks";

interface OptionPanelProps {
  taskContents: TaskContent[];
  setTaskContents: React.Dispatch<React.SetStateAction<TaskContent[]>>;
}

const OptionPanel = ({ taskContents, setTaskContents }: OptionPanelProps) => {
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
    <div className="flex flex-wrap-reverse items-baseline  justify-evenly  gap-2">
      <RemoveDoneTask removeDoneTasks={removeDoneTasks} />
      <RemoveEmptyTask removeEmptyTasks={removeEmptyTasks} />
      <ClearAllTask clearAllTasks={clearAllTasks} />
      <ResetTasks resetTasks={resetTasks} />
    </div>
  );
};

export default OptionPanel;
