import { useEffect, useState, useCallback } from "react";
import Task from "../Task";
import { TaskContent } from "../types";
import AddRemoveTaskPanel from "../AddRemoveTaskPanel";
import MainToolBar from "../MainToolBar";
import { Store } from "@tauri-apps/plugin-store";
import { eventBus } from "../utils/eventBus";

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

  const [backgroundImage, setBackgroundImage] = useState("");

  const [store, setStore] = useState<Store | null>(null);
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);

  const loadImage = useCallback(async () => {
    if (store) {
      const savedImage = await store.get<string>("backgroundImageSelected");
      if (savedImage) {
        setBackgroundImage(savedImage);
      }
    }
  }, [store]);

  const initStoreAndLoadImage = useCallback(async () => {
    if (isStoreInitialized) {
      return;
    }

    try {
      const storeInstance = await Store.load("backgroundImageSettings.json");
      setStore(storeInstance);
      const saveImage = await storeInstance.get<string>(
        "backgroundImageSelected"
      );
      if (saveImage !== undefined) {
        setBackgroundImage(saveImage);
      } else {
        console.log("no saved image file");
      }
      setIsStoreInitialized(true);
    } catch (error) {
      console.log("initalsiation of store problem or reading image", error);
    }
  }, []);

  useEffect(() => {
    if (!isStoreInitialized) {
      initStoreAndLoadImage();
    }
    eventBus.on("backgroundImageUpdated", loadImage);

    return () => {
      eventBus.off("backgroundImageUpdated", loadImage);
    };
  }, [initStoreAndLoadImage, loadImage, isStoreInitialized]);

  return (
    <div
      className="h-screen w-screen bg-gray-700 overflow-auto overflow-x-hidden "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
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
