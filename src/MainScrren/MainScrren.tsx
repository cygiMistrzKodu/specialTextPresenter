import { useEffect, useState } from "react";
import Task from "../Task";
import { TaskContent } from "../types";
import AddRemoveTaskPanel from "../AddRemoveTaskPanel";
import MainToolBar from "../MainToolBar";

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

  const [backgroundImage, setBackgroundImage] = useState("url('/testImages/image 6.jpg')"); 

  useEffect(() => {
    console.log(backgroundImage);
  },[backgroundImage])
  

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto overflow-x-hidden " 
    style={{backgroundImage: backgroundImage,
      // backgroundSize: "cover",   // ? czy cover czy containe zastnawiams ię 
      backgroundSize: "contain",
      backgroundPosition : "center",
      width: "100vw",
      height: "100vh"
    }} >
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
    </div>
  );
};
export default MainScrren;
