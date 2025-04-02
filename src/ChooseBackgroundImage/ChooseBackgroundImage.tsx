import { useEffect, useRef, useState } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { eventBus } from "../utils/eventBus";

const ChooseBackgroundImage = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [backgroundImageSelected, setBackgroundImageSelected] = useState("");

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
      if (store !== null) {
        await store.set("backgroundImageSelected", backgroundImageSelected);
        await store.save();
        eventBus.emit("backgroundImageUpdated");  // i to po tronie wyśweitlajace przechwycić żeby wstawić zapisany z dysku obraz
      }
    };
    saveToStore();
  }, [backgroundImageSelected, store]);

  useEffect(() => {
    const initStore = async () => {
      const storeInstance = await Store.load("backgroundImageSettings.json");
      setStore(storeInstance);

      const val: string | undefined = await storeInstance.get(
        "backgroundImageSelected"
      );
      if (val !== undefined) {
        setBackgroundImageSelected(val);
        setImagePreview(val);
      }
    };
    initStore();
  }, []);

  const onSelectImageConfirmation = () => {
    setBackgroundImageSelected(imagePreview);
    closeModal();
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
          <div className="modal-action">
            <div className="flex justify-center items-center">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Saved Preview"
                  style={{
                    width: "500px",
                    height: "400px",
                    objectFit: "contain",
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
