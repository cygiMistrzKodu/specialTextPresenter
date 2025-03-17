import { useState, useRef, useEffect } from "react";

import TaskCountStatistic from "../TaskCountStatistic";
import StorePanel from "../StorePanel";
import OptionPanel from "../OptionPanel";
import SendPanel from "../SendPanel";
import VisibilityMenuElement from "../VisibilityMenuElement";
import { TaskContent } from "../types";
import { Store } from "@tauri-apps/plugin-store";

interface MainToolBarProps {
  taskContents: TaskContent[];
  setTaskContents: React.Dispatch<React.SetStateAction<TaskContent[]>>;
  onMainToolbarHeightChange: (heightInPixels: number) => void;
}

const MainToolBar = ({
  taskContents,
  setTaskContents,
  onMainToolbarHeightChange,
}: MainToolBarProps) => {
  const mainToolBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.target instanceof HTMLElement) {
          onMainToolbarHeightChange(entry.target.offsetHeight);
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    const handleResize = () => {
      if (mainToolBarRef.current) {
        onMainToolbarHeightChange(mainToolBarRef.current.offsetHeight);
      }
    };

    if (mainToolBarRef.current) {
      observer.observe(mainToolBarRef.current);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (mainToolBarRef.current) {
        observer.unobserve(mainToolBarRef.current);
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const [isStatisticPanelVisible, setIsStatisticPanelVisible] = useState(true);

  const onStatisticPanelVisibilityChange = () => {
    setIsStatisticPanelVisible(!isStatisticPanelVisible);
  };

  const [isTaskOptionsPanelVisible, setIsTaskOptionsPanelVisible] =
    useState(true);

  const onTaskOptionsPanelVisibilityChange = () => {
    setIsTaskOptionsPanelVisible(!isTaskOptionsPanelVisible);
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
    if (mainToolBarRef.current !== null) {
      onMainToolbarHeightChange(mainToolBarRef.current.offsetHeight);
    }
  }, [
    isStatisticPanelVisible,
    isTaskOptionsPanelVisible,
    isSendPanelVisible,
    isStorePanelVisible,
  ]);

  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const saveToStore = async () => {
      if (store !== null) {
        await store.set("isStatisticPanelVisible", isStatisticPanelVisible);
        await store.set("isTaskOptionsPanelVisible", isTaskOptionsPanelVisible);
        await store.set("isSendPanelVisible", isSendPanelVisible);
        await store.set("isStorePanelVisible", isStorePanelVisible);
        await store.save();
      }
    };
    saveToStore();
  }, [
    store,
    isStatisticPanelVisible,
    isTaskOptionsPanelVisible,
    isSendPanelVisible,
    isStorePanelVisible,
  ]);

  useEffect(() => {
    const initStore = async () => {
      const storeInstance = await Store.load(
        "mainToolBarVisibilitySettings.json"
      );
      setStore(storeInstance);

      const isStatisticPanelVisibleStore: boolean | undefined =
        await storeInstance.get("isStatisticPanelVisible");

      if (isStatisticPanelVisibleStore !== undefined) {
        setIsStatisticPanelVisible(isStatisticPanelVisibleStore);
      }

      const isTaskOptionsPanelVisibleStore: boolean | undefined =
        await storeInstance.get("isTaskOptionsPanelVisible");

      if (isTaskOptionsPanelVisibleStore !== undefined) {
        setIsTaskOptionsPanelVisible(isTaskOptionsPanelVisibleStore);
      }

      const isSendPanelVisibleStore: boolean | undefined =
        await storeInstance.get("isSendPanelVisible");

      if (isSendPanelVisibleStore !== undefined) {
        setIsSendPanelVisible(isSendPanelVisibleStore);
      }

      const isStorePanelVisibleStore: boolean | undefined =
        await storeInstance.get("isStorePanelVisible");

      if (isStorePanelVisibleStore !== undefined) {
        setIsStorePanelVisible(isStorePanelVisibleStore);
      }
    };

    initStore();
  }, []);

  return (
    <div
      ref={mainToolBarRef}
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
              <i className="fa-regular fa-eye fa-2x" title="Visibility"></i>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 p-2 w-44 shadow z-50"
            >
              <VisibilityMenuElement
                title="show statistic"
                visiblityState={isStatisticPanelVisible}
                onVisiblityChange={onStatisticPanelVisibilityChange}
              />
              <VisibilityMenuElement
                title="show option panel"
                visiblityState={isTaskOptionsPanelVisible}
                onVisiblityChange={onTaskOptionsPanelVisibilityChange}
              />

              <VisibilityMenuElement
                title="show send panel"
                visiblityState={isSendPanelVisible}
                onVisiblityChange={onSendPanellVisibilityChange}
              />
              <VisibilityMenuElement
                title="show store panel"
                visiblityState={isStorePanelVisible}
                onVisiblityChange={onStorePanellVisibilityChange}
              />
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
        <div className="flex flex-wrap-reverse  gap-2 m-1 pe-5 w-full">
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
          {isTaskOptionsPanelVisible && (
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
  );
};

export default MainToolBar;
