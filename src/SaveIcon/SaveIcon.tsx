import { useEffect, useState } from "react";
import { eventBus } from "../utils/eventBus";

const SaveIcon = () => {
  const [isSavingIconVisible, setIsSavingIconVisible] = useState(false);

  useEffect(() => {
    const showSaveIcon = () => {
      setIsSavingIconVisible(true);

      setTimeout(() => {
        setIsSavingIconVisible(false);
      }, 2000);
    };

    eventBus.on("save", showSaveIcon);

    return () => {
      eventBus.off("save", showSaveIcon);
    };
  }, []);

  return (
    <>
      {isSavingIconVisible && (
        <div className="flex justify-center">
          <i className="text-green-500 animate-bounce fa-2x fa-save fas"></i>
        </div>
      )}
    </>
  );
};

export default SaveIcon;
