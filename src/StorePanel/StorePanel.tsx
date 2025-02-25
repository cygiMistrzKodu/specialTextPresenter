import { useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import { TaskContent } from "../types";
import { getCurrentWindow } from "@tauri-apps/api/window";
import Read from "../Read";
import Save from "../Save";

interface StorePanelProps {
  taskContents: TaskContent[];
  setTaskContents: React.Dispatch<React.SetStateAction<TaskContent[]>>;
}

const StorePanel = ({ taskContents, setTaskContents }: StorePanelProps) => {
  const taskContentRef = useRef(taskContents);

  useEffect(() => {
    taskContentRef.current = taskContents;
  }, [taskContents]);

  const toAutoSave = async () => {
    const currentTasks = taskContentRef.current;

    const tasksWithTrimmedContents = currentTasks.map((task) => ({
      ...task,
      content: task.content.trim(),
    }));

    await invoke("auto_save_tasks", { taskContents: tasksWithTrimmedContents });
  };

  const saveToStoreWhenApplicationIsClosing = () => {
    useEffect(() => {
      const closeHandler = async () => {
        await toAutoSave();
        await getCurrentWindow().destroy();
      };

      const unlisten = getCurrentWindow().onCloseRequested(closeHandler);

      return () => {
        unlisten.then((fn) => fn());
      };
    }, [taskContents]);
  };
  saveToStoreWhenApplicationIsClosing();

  const saveByCtrlPlusS = () => {
    useEffect(() => {
      const runSaveToStoreOnKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          toAutoSave();
        }
      };

      window.addEventListener("keydown", runSaveToStoreOnKeyDown);

      return () => {
        window.removeEventListener("keydown", runSaveToStoreOnKeyDown);
      };
    }, []);
  };
  saveByCtrlPlusS();

  const readAutoSave = async () => {
    setTaskContents([]);
    const readTasks: TaskContent[] = await invoke("read_saved_tasks_contents");
    setTaskContents(readTasks);
  };

  const readfromAutoSaveStore = () => {
    useEffect(() => {
      readAutoSave();
    }, []);
  };
  readfromAutoSaveStore();

  return (
    <div className="flex gap-2">
      <Save toAutoSave={toAutoSave} />
      <Read readAutoSave={readAutoSave} />
    </div>
  );
};

export default StorePanel;
