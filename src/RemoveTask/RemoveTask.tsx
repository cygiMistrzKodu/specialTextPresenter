interface RemoveTaskProps {
  removeLastTask: () => void;
}

const RemoveTask = ({ removeLastTask }: RemoveTaskProps) => {
  return (
    <button
      className="btn btn-outline btn-secondary btn-lg ms-5"
      onClick={removeLastTask}
    >
      <i className="fa-solid fa-minus"></i>
    </button>
  );
};

export default RemoveTask;
