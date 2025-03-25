import { useEffect, useState } from "react";



const ChooseBackgroundImage = () => {
  useEffect(() => {
    console.log(`ChooseBackgroundImage mounted`);
  }, []);

  const [imagePreview, setImagePreview] = useState("");

  const chooseImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageBase64 = reader.result as string;
        setImagePreview(imageBase64);
      };
      reader.readAsDataURL(file[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={chooseImage} />
    </div>
  );
};

export default ChooseBackgroundImage;
