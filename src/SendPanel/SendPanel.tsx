import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { TaskContent } from "../types";

interface SendPanelProps {
  taskContents: TaskContent[];
}

const SendPanel = ({ taskContents }: SendPanelProps) => {
  const [numberOfTaskToSend, setNumberOfTaskToSend] = useState(1);

  const onSendClick = () => {
    if (taskContents.length > 0) {
      const contentsOfToDoTasks = taskContents
        .filter((task) => task.isDone === false && task.content !== "")
        .map((task) => task.content)
        .slice(0, numberOfTaskToSend);

      sendTo(contentsOfToDoTasks);
    }
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

  const onSelectTaskToSend = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setNumberOfTaskToSend(value);
  };

  const taskToSendOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex gap-2">
      <button
        onClick={onSendClick}
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
      >
        send
      </button>
      <select className="select select-info" onChange={onSelectTaskToSend}>
        {taskToSendOptions.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
        ;
      </select>
    </div>
  );
};

export default SendPanel;
