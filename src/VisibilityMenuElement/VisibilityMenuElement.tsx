interface VisibilityMenuProps {
  title: string;
  visiblityState: boolean;
  onVisiblityChange: () => void;
}

const VisibilityMenuElement = ({
  title,
  visiblityState,
  onVisiblityChange,
}: VisibilityMenuProps) => {
  const uniqueId = `menuSubPanel-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex justify-between w-full mt-1">
      <label htmlFor={uniqueId} className="flex-grow cursor-pointer">
        {title}
      </label>
      <input
        id={uniqueId}
        type="checkbox"
        className="checkbox checkbox-primary ms-2"
        checked={visiblityState}
        onChange={onVisiblityChange}
      />
    </div>
  );
};

export default VisibilityMenuElement;
