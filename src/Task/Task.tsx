import React, { RefObject, useEffect, useRef, useState } from "react";
import Copy from "../Copy";
import Clear from "../Clear";
import ToDo from "../ToDo";

const Task = () => {
  const [taskInfo, setTaskInfo] = useState("");
  const taskInfoRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const [isDone, setIsDone] = useState(false);
  const [taskBgColor, setTaskBgColor] = useState("bg-green-700");

  const taskInfoChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTaskInfo(event.target.value);
  };

  const adjustTaskHeight = () => {
    if (taskInfoRef.current) {
      taskInfoRef.current.style.height = "auto";
      taskInfoRef.current.style.height = `${taskInfoRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTaskHeight();
  }, [taskInfo]);

  return (
    <div
      className={`w-36 rounded  shadow-lg  ${taskBgColor}
     text-white border border-yellow-500
     hover:bg-green-950 hover:shadow-2xl min-w-[200px] min-h-[50px] m-1 break-words p-2`}
    >
      <div className="flex justify-between items-start">
        <textarea
          ref={taskInfoRef}
          value={taskInfo}
          onChange={taskInfoChange}
          className="resize-none w-full bg-inherit overflow-hidden p-1 font-thin m-1"
          placeholder="Wpisz text"
        />
        <ToDo
          isDone={isDone}
          setIsDone={setIsDone}
          setTaskBgColor={setTaskBgColor}
        ></ToDo>
      </div>
      <div className="flex justify-between">
        <Copy text={taskInfo} />
        <Clear state={setTaskInfo} />
      </div>
    </div>
  );
};

export default Task;
