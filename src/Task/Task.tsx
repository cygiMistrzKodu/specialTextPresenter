import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import Copy from "../Copy";
import Clear from "../Clear";
import ToDo from "../ToDo";

interface TaskContentProps {
  onTaskInfoChange: (content: string) => void;
  content: string;
  isTaskDone: boolean;
  isTaskStatusChange: (taksStatus: boolean) => void;
}

const Task: React.FC<TaskContentProps> = ({
  onTaskInfoChange: onTaskInfoChange,
  content: content,
  isTaskDone: isTaskDone,
  isTaskStatusChange: isTaskStatusChange,
}) => {
  const [taskInfo, setTaskInfo] = useState("");
  const taskInfoRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const [taskBgColor, setTaskBgColor] = useState("bg-green-700");

  const taskInfoChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskInfo(event.target.value);
    onTaskInfoChange(event.target.value);
  };

  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    isTaskStatusChange(isDone);
  }, [isDone]);

  useEffect(() => {
    setIsDone(isTaskDone);
  }, [isTaskDone]);

  useEffect(() => {
    setTaskInfo(content);
  }, [content]);

  const adjustTaskHeight = () => {
    if (taskInfoRef.current) {
      taskInfoRef.current.style.height = "auto";
      taskInfoRef.current.style.height = `${taskInfoRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTaskHeight();
  }, [taskInfo]);

  const onIsDoneChange = (isTaskDone: boolean) => {
    setIsDone(isTaskDone);
    isTaskStatusChange(isTaskDone);
  };

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
          onIsDoneChange={onIsDoneChange}
          setTaskBgColor={setTaskBgColor}
        ></ToDo>
      </div>
      <div className="flex justify-between">
        <Copy text={taskInfo} />
        <Clear
          state={setTaskInfo}
          resetTaskInfo={onTaskInfoChange}
          resetDoneStatus={onIsDoneChange}
        />
      </div>
    </div>
  );
};

export default Task;
