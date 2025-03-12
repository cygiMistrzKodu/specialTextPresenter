import { useState, useRef, useEffect } from "react";
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

  const [topFixedPaneHeight, setTopFixedPaneHeight] = useState(0);
  const topFixedPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.target instanceof HTMLElement) {
          setTopFixedPaneHeight(entry.target.offsetHeight);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    const handleResize = () => {
      if (topFixedPanelRef.current) {
        setTopFixedPaneHeight(topFixedPanelRef.current.offsetHeight);
      }
    };

    if (topFixedPanelRef.current) {
      observer.observe(topFixedPanelRef.current);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (topFixedPanelRef.current) {
        observer.unobserve(topFixedPanelRef.current);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const [isStatisticPanelVisible, setIsStatisticPanelVisible] = useState(true);

  const onStatisticPanelVisibilityChange = () => {
    setIsStatisticPanelVisible(!isStatisticPanelVisible);
  };

  const [isOptionPanelVisible, setIsOptionPanelVisible] = useState(true);

  const onOptionPanellVisibilityChange = () => {
    setIsOptionPanelVisible(!isOptionPanelVisible);
  };

  const [isSendPanelVisible, setIsSendPanelVisible] = useState(true);

  const onSendPanellVisibilityChange = () => {
    setIsSendPanelVisible(!isSendPanelVisible);
  };

  const [isStorePanelVisible, setIsStorePanelVisible] = useState(true);

  const onStorePanellVisibilityChange = () => {
    setIsStorePanelVisible(!isStorePanelVisible);
  };

  useEffect(() => {
    if (topFixedPanelRef.current !== null) {
      setTopFixedPaneHeight(topFixedPanelRef.current.offsetHeight);
    }
  }, [
    isStatisticPanelVisible,
    isOptionPanelVisible,
    isSendPanelVisible,
    isStorePanelVisible,
  ]);

  return (
    <div className="h-screen w-screen bg-gray-700 overflow-auto overflow-x-hidden">
      <div
        ref={topFixedPanelRef}
        className="fixed top-0 w-full z-40 flex flex-col bg-gray-700"
      >
        <div className="navbar bg-base-100 shadow-sm z-50  min-h-3 py-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                Visibility
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 p-2 w-44 shadow z-50"
              >
                <div className="flex justify-between w-full mt-1">
                  <label
                    htmlFor="visibilityStatisitcPanelOption"
                    className="flex-grow cursor-pointer"
                  >
                    show statistic
                  </label>
                  <input
                    id="visibilityStatisitcPanelOption"
                    type="checkbox"
                    className="checkbox checkbox-primary ms-2"
                    checked={isStatisticPanelVisible}
                    onChange={onStatisticPanelVisibilityChange}
                  />
                </div>
                <div className="flex justify-between w-full mt-1">
                  <label
                    htmlFor="visibilityOptionPanel"
                    className="flex-grow cursor-pointer"
                  >
                    show option panel
                  </label>
                  <input
                    id="visibilityOptionPanel"
                    type="checkbox"
                    className="checkbox checkbox-primary ms-2"
                    checked={isOptionPanelVisible}
                    onChange={onOptionPanellVisibilityChange}
                  />
                </div>
                <div className="flex justify-between w-full mt-1">
                  <label
                    htmlFor="visibilitySendPanel"
                    className="flex-grow cursor-pointer"
                  >
                    show send panel
                  </label>
                  <input
                    id="visibilitySendPanel"
                    type="checkbox"
                    className="checkbox checkbox-primary ms-2"
                    checked={isSendPanelVisible}
                    onChange={onSendPanellVisibilityChange}
                  />
                </div>
                <div className="flex justify-between w-full mt-1">
                  <label
                    htmlFor="visibilityStorePanel"
                    className="flex-grow cursor-pointer"
                  >
                    show store panel
                  </label>
                  <input
                    id="visibilityStorePanel"
                    type="checkbox"
                    className="checkbox checkbox-primary ms-2"
                    checked={isStorePanelVisible}
                    onChange={onStorePanellVisibilityChange}
                  />
                </div>
              </ul>
            </div>
          </div>
        </div>
        {isStatisticPanelVisible && (
          <div className="flex z-10 bg-gray-700 w-full p-1">
            <TaskCountStatistic tasks={taskContents} />
          </div>
        )}
        <div className="z-10 bg-gray-700 w-full p-2">
          <div className="flex flex-wrap-reverse  gap-2 m-2 p-2 w-full">
            <div className={`${isStorePanelVisible ? "block" : "hidden"}`}>
              <StorePanel
                taskContents={taskContents}
                setTaskContents={setTaskContents}
              />
            </div>
            {isSendPanelVisible && (
              <span className="mb-2">
                <SendPanel taskContents={taskContents} />
              </span>
            )}
            {isOptionPanelVisible && (
              <span className="ml-auto mb-3">
                <OptionPanel
                  taskContents={taskContents}
                  setTaskContents={setTaskContents}
                />
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: topFixedPaneHeight }}
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
