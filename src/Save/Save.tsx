interface SaveProps {
  toAutoSave: () => void;
}

const Save = ({ toAutoSave }: SaveProps) => {
  return (
    <button
      onClick={toAutoSave}
      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg shadow-lg
         hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
    >
      save
    </button>
  );
};

export default Save;
