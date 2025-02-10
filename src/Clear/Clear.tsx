interface IClear {
  state: (arg: string) => void;
  resetDoneStatus: (isDone: boolean) => void;
  resetTaskInfo: (content: string) => void;
}

const Clear = ({
  state,
  resetTaskInfo: resetTaskInfo,
  resetDoneStatus: resetDoneStatus,
}: IClear) => {
  const clearTaskInfo = () => {
    state("");
    resetDoneStatus(false);
    resetTaskInfo("");
  };

  return (
    <button className="btn btn-xs btn-error" onClick={clearTaskInfo}>
      Clear
    </button>
  );
};

export default Clear;
