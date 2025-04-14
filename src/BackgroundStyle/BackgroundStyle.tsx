import { useEffect, useState, useCallback } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { eventBus } from "../utils/eventBus";

const BackgroundStyle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [store, setStore] = useState<Store | null>(null);

  const [backgroundImage, setBackgroundImage] = useState<undefined | string>(
    ""
  );
  const [backgroundImageSizeOptions, setBackgroundImageSizeOptions] = useState<
    "contain" | "cover" | undefined
  >(undefined);

  const loadImage = useCallback(async () => {
    if (store) {
      const savedImage = await store.get<string>("backgroundImageSelected");
      setBackgroundImage(savedImage);

      const imageOption = await store.get<"contain" | "cover">(
        "imageOptionSizeSelected"
      );
      if (imageOption) {
        setBackgroundImageSizeOptions(imageOption);
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
    } catch (error) {
      console.log("initalsiation of store problem", error);
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
        backgroundSize: backgroundImageSizeOptions || "contain",
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
