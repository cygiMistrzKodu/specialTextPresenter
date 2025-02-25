interface ClearAllTaskProps {
  clearAllTasks: () => void;
}

const ClearAllTask = ({ clearAllTasks }: ClearAllTaskProps) => {
  return (
    <button
      onClick={clearAllTasks}
      className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 py-2 rounded-lg shadow-lg
   hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
    >
      clear all
    </button>
  );
};

export default ClearAllTask;
