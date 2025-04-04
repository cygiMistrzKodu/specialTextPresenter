import { useEffect, useState, useCallback } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { eventBus } from "../utils/eventBus";

const BackgroundImage = () => {
  const [store, setStore] = useState<Store | null>(null);
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);

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
    if (isStoreInitialized) {
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
      setIsStoreInitialized(true);
    } catch (error) {
      console.log("initalsiation of store problem or reading image", error);
    }
  }, []);

  useEffect(() => {
    if (!isStoreInitialized) {
      initStoreAndLoadImage();
    }
    eventBus.on("backgroundImageUpdated", loadImage);

    return () => {
      eventBus.off("backgroundImageUpdated", loadImage);
    };
  }, [initStoreAndLoadImage, loadImage, isStoreInitialized]);

  return {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    width: "100vw",
    height: "100vh",
  };
};

export default BackgroundImage;
