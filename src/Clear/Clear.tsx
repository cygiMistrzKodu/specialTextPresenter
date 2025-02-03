
interface IClear {
  state: (arg: string) => void;
  onClear:(arg: string) => void;
}

const Clear = ({ state, onClear: onStateChange }: IClear) => {

  const clearTaskInfo = () => {
    state("");
    onStateChange("");
  };

  return (
    <button className="btn btn-xs btn-error" onClick={clearTaskInfo}>
      Clear
    </button>
  );
};

export default Clear;
