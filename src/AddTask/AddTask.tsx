interface AddTaskProps {
  addTask: () => void;
}

const AddTask = ({ addTask }: AddTaskProps) => {
  return (
    <button className="btn btn-outline btn-accent btn-lg" onClick={addTask}>
      <i className="fa-solid fa-plus"></i>
    </button>
  );
};

export default AddTask;
