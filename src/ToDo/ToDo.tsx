interface IToDo {
  setIsDone: (arg: boolean) => void;
  isDone: boolean;
  setTaskBgColor: (arg: string) => void;
}

const ToDo = ({ isDone, setIsDone, setTaskBgColor }: IToDo) => {
  const isTaskDone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDone(event.target.checked);

    if (event.target.checked) {
      setTaskBgColor("bg-black");
    } else {
      setTaskBgColor("bg-green-700");
    }
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
