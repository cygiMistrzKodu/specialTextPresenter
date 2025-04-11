import { useEffect, useRef, useState } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { eventBus } from "../utils/eventBus";

const ChooseBackgroundImage = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [backgroundImageSelected, setBackgroundImageSelected] = useState("");

  const [backgroundImageSizeOptions, setBackgroundImageSizeOptions] = useState<
    "contain" | "cover" | undefined
  >(undefined);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const chooseImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result as string;
        setImagePreview(imageBase64);
      };
      reader.readAsDataURL(file[0]);
    }
  };

  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const saveToStore = async () => {
      if (store !== null && backgroundImageSizeOptions !== undefined) {
        await store.set("backgroundImageSelected", backgroundImageSelected);

        await store.set("imageOptionSizeSelected", backgroundImageSizeOptions);

        await store.save();
        eventBus.emit("backgroundImageUpdated");
      }
    };
    saveToStore();
  }, [backgroundImageSelected, backgroundImageSizeOptions, store]);

  useEffect(() => {
    const initStore = async () => {
      const storeInstance = await Store.load("backgroundImageSettings.json");
      setStore(storeInstance);

      const backgroundImage: string | undefined = await storeInstance.get(
        "backgroundImageSelected"
      );
      if (backgroundImage !== undefined) {
        setBackgroundImageSelected(backgroundImage);
        setImagePreview(backgroundImage);
      }

      const imageOptionSize: "contain" | "cover" | undefined =
        await storeInstance.get("imageOptionSizeSelected");

      if (imageOptionSize !== undefined) {
        setBackgroundImageSizeOptions(imageOptionSize);
      }
    };
    initStore();
  }, []);

  const onSelectImageConfirmation = () => {
    setBackgroundImageSelected(imagePreview);
    closeModal();
  };

  const backgroundImageSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundImageSizeOptions(event.target.value as "contain" | "cover");
  };

  return (
    <div>
      <button className="btn btn-neutral" onClick={openModal}>
        <i className="fa-solid fa-image" title="background image"></i>
      </button>
      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            <i className="fa-solid fa-x"></i>
          </button>
          <h1 className="font-bold text-lg"> Choose background image </h1>
          <div className="flex justify-around mt-3">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary"
              accept="image/*"
              onChange={chooseImage}
            />
            <button
              className="btn btn-neutral"
              onClick={onSelectImageConfirmation}
            >
              Ok
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mt-4">Options</h1>
            <div className="form-control flex flex-row items-center space-x-4">
              <label className="label cursor-pointer">
                <span className="label-text me-2">contain</span>
                <input
                  type="radio"
                  name="backgroundImageSizeChoose"
                  value="contain"
                  checked={backgroundImageSizeOptions == "contain"}
                  className="radio radio-primary"
                  onChange={backgroundImageSizeChange}
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text me-2">cover</span>
                <input
                  type="radio"
                  name="backgroundImageSizeChoose"
                  value="cover"
                  checked={backgroundImageSizeOptions == "cover"}
                  className="radio radio-primary"
                  onChange={backgroundImageSizeChange}
                />
              </label>
            </div>
          </div>
          <div className="modal-action">
            <div className="flex justify-center items-center">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Saved Preview"
                  style={{
                    width: "500px",
                    height: "400px",
                    objectFit: backgroundImageSizeOptions || "contain",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ChooseBackgroundImage;
