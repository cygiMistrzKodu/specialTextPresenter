
interface CountFiledProps {
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
}: CountFiledProps) => {

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
