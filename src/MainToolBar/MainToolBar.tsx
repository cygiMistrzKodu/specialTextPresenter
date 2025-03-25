import { useState, useRef, useEffect } from "react";

import TaskCountStatistic from "../TaskCountStatistic";
import StorePanel from "../StorePanel";
import OptionPanel from "../OptionPanel";
import SendPanel from "../SendPanel";
import VisibilityMenuElement from "../VisibilityMenuElement";
import { TaskContent } from "../types";
import { Store } from "@tauri-apps/plugin-store";
import SaveIcon from "../SaveIcon";
import ChooseBackgroundImage from "../ChooseBackgroundImage";

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

  const saveVisibilitySettings = async (
    store: Store,
    visibilityData: Record<string, boolean>
  ) => {
    for (const [key, value] of Object.entries(visibilityData)) {
      await store.set(key, value);
    }
    await store.save();
  };

  const loadVisibilitySettings = async (
    store: Store,
    visiblityKeys: { key: string; setter: (value: boolean) => void }[]
  ) => {
    for (const { key, setter } of visiblityKeys) {
      const value: boolean | undefined = await store.get(key);
      if (value !== undefined) {
        setter(value);
      }
    }
  };

  useEffect(() => {
    const saveToStore = async () => {
      if (store !== null) {
        const visibilityData = {
          isStatisticPanelVisible,
          isTaskOptionsPanelVisible,
          isSendPanelVisible,
          isStorePanelVisible,
        };

        saveVisibilitySettings(store, visibilityData);
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

      const visiblityKeys = [
        { key: "isStatisticPanelVisible", setter: setIsStatisticPanelVisible },
        {
          key: "isTaskOptionsPanelVisible",
          setter: setIsTaskOptionsPanelVisible,
        },
        { key: "isSendPanelVisible", setter: setIsSendPanelVisible },
        { key: "isStorePanelVisible", setter: setIsStorePanelVisible },
      ];

      loadVisibilitySettings(storeInstance, visiblityKeys);
    };

    initStore();
  }, []);

  return (
    <div
      ref={mainToolBarRef}
      className="flex flex-col bg-gray-700 w-full fixed top-0 z-40"
    >
      <div className="navbar bg-base-100 shadow-sm min-h-3 py-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <i className="fa-2x fa-eye fa-regular" title="Visibility"></i>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100 p-2 rounded-box shadow w-44 menu menu-sm z-1 z-50"
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
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <i className="fa-solid fa-gears fa-2x"></i>
            </div>
            <ul className="dropdown-content bg-base-100 p-2 rounded-box shadow w-64 menu menu-sm z-50">
              <ChooseBackgroundImage />
            </ul>
          </div>
        </div>
        <SaveIcon />
      </div>
      {isStatisticPanelVisible && (
        <div className="flex bg-gray-700 p-1 w-full z-10">
          <TaskCountStatistic tasks={taskContents} />
        </div>
      )}
      <div className="bg-gray-700 p-2 w-full z-10">
        <div className="flex flex-wrap-reverse m-1 w-full gap-2 pe-5">
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
            <span className="mb-3 ml-auto">
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
