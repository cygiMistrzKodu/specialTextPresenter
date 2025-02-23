import { useEffect } from "react";

interface ICountFiled {
  count: number;
  gradientColorFrom: string;
  gradinetColorTo: string;
  title: string;
}

const CountFiled = ({
  count,
  gradientColorFrom,
  gradinetColorTo,
  title
}: ICountFiled) => {
  useEffect(() => {
    console.log(`CountFiled mounted`);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(to right, ${gradientColorFrom}, ${gradinetColorTo})`
  };

  return (
    <span
      className="countdown font-mono text-4xl ms-6"
      style={gradientStyle}
    >
      {title}:{count}
    </span>
  );
};

export default CountFiled;
