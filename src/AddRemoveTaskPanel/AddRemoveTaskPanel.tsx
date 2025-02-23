import { TaskContent } from "../types";
import AddTask from "../AddTask";
import RemoveTask from "../RemoveTask";
import { useEffect } from "react";

interface AddRemoveTaskPanelProps {
  setTaskContents: React.Dispatch<React.SetStateAction<TaskContent[]>>;
}

const AddRemoveTaskPanel = ({ setTaskContents }: AddRemoveTaskPanelProps) => {
  const addTask = () => {
    setTaskContents((prevContents) => [
      ...prevContents,
      {
        content: "",
        isDone: false,
      },
    ]);
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

  const removeLastTask = () => {
    setTaskContents((prevContents) => {
      if (prevContents.length === 0) return prevContents;

      return prevContents.slice(0, -1);
    });
  };
  

  return (
    <div className="flex items-center justify-center  min-w-[200px] min-h-[100px] p-2 m-1 ">
      <AddTask addTask={addTask} />
      <RemoveTask removeLastTask={removeLastTask} />
    </div>
  );
};

export default AddRemoveTaskPanel;
