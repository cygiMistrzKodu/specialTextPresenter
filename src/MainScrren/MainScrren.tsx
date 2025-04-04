import { useState } from "react";
import Task from "../Task";
import { TaskContent } from "../types";
import AddRemoveTaskPanel from "../AddRemoveTaskPanel";
import MainToolBar from "../MainToolBar";
import BackgroundStyle from "../BackgroundStyle";
BackgroundStyle;

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

  const [mainToolBarHeight, setMainToolBarHeight] = useState(0);

  const onMainToolBarHeightChange = (heightInPixels: number) => {
    setMainToolBarHeight(heightInPixels);
  };

  return (
    <BackgroundStyle>
      <MainToolBar
        taskContents={taskContents}
        setTaskContents={setTaskContents}
        onMainToolbarHeightChange={onMainToolBarHeightChange}
      />
      <div
        style={{ marginTop: mainToolBarHeight }}
        className="flex flex-wrap justify-start items-start p-2 m-1"
      >
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
    </BackgroundStyle>
  );
};
export default MainScrren;
