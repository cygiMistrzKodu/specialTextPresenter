interface IClear {
  state: (arg: string) => void;
}

const Clear = ({ state }: IClear) => {

  const clearTaskInfo = () => {
    state("");
  };

  return (
    <button className="btn btn-xs btn-error" onClick={clearTaskInfo}>
      Clear
    </button>
  );
};

export default Clear;
