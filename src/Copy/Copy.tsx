interface ICopy {
  text: string;
}

const Copy = ({ text }: ICopy) => {
  const copyContent = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button className="btn btn-xs  btn-accent" onClick={copyContent}>
      Copy
    </button>
  );
};

export default Copy;
