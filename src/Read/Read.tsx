interface ReadProps {
  readAutoSave: () => void;
}

const Read = ({ readAutoSave }: ReadProps) => {
  return (
    <button
      onClick={readAutoSave}
      className="me-10 bg-gradient-to-r from-amber-500 to-amber-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
    >
      read
    </button>
  );
};

export default Read;
