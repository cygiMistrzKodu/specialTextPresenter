import { useState } from "react";
import Task from "../Task";

import { TaskContent } from "../types";

import TaskCountStatistic from "../TaskCountStatistic";
import AddRemoveTaskPanel from "../AddRemoveTaskPanel";
import StorePanel from "../StorePanel";
import OptionPanel from "../OptionPanel";

import { invoke } from "@tauri-apps/api/core";

const MainScrren = () => {
  const [taskContents, setTaskContents] = useState<TaskContent[]>([]);

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

  const sendTo = async (contents: string[]) => {
    const links = contents.map(
      (content) => `https://www.youtube.com/results?search_query=${content}`
    );

    try {
      await invoke("send_to_browser", { links });
    } catch (error) {
      console.error("browser no opening", error);
    }
  };

  const onSendClick = () => {
    if (taskContents.length > 0) {
      const contentsOfToDoTasks = taskContents
        .filter((task) => task.isDone === false && task.content !== "")
        .map((task) => task.content);

      sendTo(contentsOfToDoTasks);
    }
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
          onClick={onSendClick}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
        >
          Send Test
        </button>
        <span className="ml-auto">
          <OptionPanel
            taskContents={taskContents}
            setTaskContents={setTaskContents}
          />
        </span>
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
