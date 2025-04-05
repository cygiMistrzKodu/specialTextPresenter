import { useEffect, useState, useCallback } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { eventBus } from "../utils/eventBus";

const BackgroundStyle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, setStore] = useState<Store | null>(null);

  const [backgroundImage, setBackgroundImage] = useState("");

  const loadImage = useCallback(async () => {
    if (store) {
      const savedImage = await store.get<string>("backgroundImageSelected");
      if (savedImage) {
        setBackgroundImage(savedImage);
      }
    }
  }, [store]);

  const initStoreAndLoadImage = useCallback(async () => {
    if (store) {
      return;
    }

    try {
      const storeInstance = await Store.load("backgroundImageSettings.json");
      setStore(storeInstance);
      const saveImage = await storeInstance.get<string>(
        "backgroundImageSelected"
      );
      if (saveImage !== undefined) {
        setBackgroundImage(saveImage);
      } else {
        console.log("no saved image file");
      }
    } catch (error) {
      console.log("initalsiation of store problem or reading image", error);
    }
  }, [store]);

  useEffect(() => {
    initStoreAndLoadImage();
    eventBus.on("backgroundImageUpdated", loadImage);

    return () => {
      eventBus.off("backgroundImageUpdated", loadImage);
    };
  }, [initStoreAndLoadImage, loadImage]);

  return (
    <div
      className="h-screen w-screen bg-gray-700 overflow-auto overflow-x-hidden "
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundStyle;
