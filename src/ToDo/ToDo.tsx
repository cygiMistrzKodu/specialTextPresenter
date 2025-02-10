import { useEffect } from "react";

interface IToDo {
  onIsDoneChange: (arg: boolean) => void;
  isDone: boolean;
  setTaskBgColor: (arg: string) => void;
}

const ToDo = ({
  isDone,
  onIsDoneChange: onIsDoneChange,
  setTaskBgColor,
}: IToDo) => {
  const isTaskDone = (event: React.ChangeEvent<HTMLInputElement>) => {
    onIsDoneChange(event.target.checked);
  };

  useEffect(() => {
    if (isDone) {
      taskDoneColor();
    } else {
      taskNotYetDoneColor();
    }
  }, [isDone]);

  const taskDoneColor = () => {
    setTaskBgColor("bg-black");
  };

  const taskNotYetDoneColor = () => {
    setTaskBgColor("bg-green-700");
  };

  return (
    <label className="swap swap-flip">
      <input type="checkbox" checked={isDone} onChange={isTaskDone} />
      <div className="swap-on">👍</div>
      <div className="swap-off">TO DO</div>
    </label>
  );
};

export default ToDo;
