import { useState, useRef } from "react";
import domtoimage from "dom-to-image";
import "./App.css";

const ImgUpload = () => {
  const [{ image, name }, setImage] = useState({
    image: "",
    name: "",
  });

  const memeBuilder = useRef();

  const handleChange = (e) => {
    console.log(e.target.files[0]);
    const myUrl = URL.createObjectURL(e.target.files[0]);
    setImage((prev) => ({ name: e.target.files[0].name, image: myUrl }));
  };

  const downloadImg = () => {
    memeBuilder.current &&
      domtoimage.toPng(memeBuilder.current).then((memeImg) => {
        let link = document.createElement("a");
        link.download = name;
        link.href = memeImg;
        link.click();
      });
  };

  return (
    <form className="upload">
      <img ref={memeBuilder} src={image} />
      <input type="file" onChange={handleChange} />
      <button type="button" onClick={downloadImg}>
        Download
      </button>
    </form>
  );
};

export default ImgUpload;
