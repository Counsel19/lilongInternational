import { useState } from "react";
import Image from "next/image";
import ShowCaseStyles from "../../styles/singleProduct/ShowCase.module.css";

const ShowCase = ({ images }) => {
  const [displayImage, setDisplayImage] = useState(0);

  return (
    <div className={ShowCaseStyles.container}>
      <div className={ShowCaseStyles.galary}>
        {images.slice(0, 3).map((image, index) => (
          <div
            key={image}
            className={ShowCaseStyles.imageWrapper}
            style={{
              border:
                displayImage == index
                  ? "1px solid #F7A76C"
                  : "1px solid #aaa",
            }}
            onClick={() => setDisplayImage(index)}
          >
            <Image
              src={image}
              alt={image.title}
              layout="fill"
              objectFit="contain"
            />

            {displayImage == index ? (
              <div className={ShowCaseStyles.overlay}></div>
            ) : null}
          </div>
        ))}
      </div>
      <div className={ShowCaseStyles.imageDisplay}>
        <div className={ShowCaseStyles.imageCase}>
          <Image
            src={images[displayImage]}
            alt={images[displayImage].title}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
