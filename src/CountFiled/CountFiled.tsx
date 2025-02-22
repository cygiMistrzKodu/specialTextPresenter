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

  return (
    <span
      className={`countdown font-mono text-4xl ms-6 bg-gradient-to-r from-${gradientColorFrom} to-${gradinetColorTo}`}
    >
      {title}:{count}
    </span>
  );
};

export default CountFiled;
