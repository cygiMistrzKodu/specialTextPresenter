import { useState } from "react";
import Task from "../Task";

import { TaskContent } from "../types";

import TaskCountStatistic from "../TaskCountStatistic";
import AddRemoveTaskPanel from "../AddRemoveTaskPanel";
import StorePanel from "../StorePanel";
import OptionPanel from "../OptionPanel";
import SendPanel from "../SendPanel";

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

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto">
      <div className="fixed top-0 w-full z-50 flex flex-col bg-gray-700">
        <div className="flex z-50 bg-gray-700 w-full p-1">
          <TaskCountStatistic tasks={taskContents} />
        </div>
        <div className="z-50 bg-gray-700 w-full p-2">
          <div className="flex flex-wrap-reverse  gap-2 m-2 p-2 w-full">
            <StorePanel
              taskContents={taskContents}
              setTaskContents={setTaskContents}
            />
            <span className="mb-2">
            <SendPanel taskContents={taskContents} />
            </span>
            <span className="ml-auto mb-3">
              <OptionPanel
                taskContents={taskContents}
                setTaskContents={setTaskContents}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-start p-2 m-1 mt-96">
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
