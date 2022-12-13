import { useEffect, useState } from "react";
import Image from "next/image";
import APShowCaseStyles from "../../../styles/singleProduct/ShowCase.module.css";
import { MdAddCircle } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import uniqid from "uniqid";

const getUid = () => uniqid.time();

const AddProductShowCase = ({
  productImages,
  images,
  setImages,
  files,
  setFiles,
}) => {
  const [displayImage, setDisplayImage] = useState(0);

  useEffect(() => {
    if (productImages?.length > 0) {
      setImages([
        ...files.map((file) => ({
          _id: file._id,
          image: URL.createObjectURL(file.image),
        })),
        ...images,
      ]);
    } else {
      setImages([
        ...files.map((file) => ({
          _id: file._id,
          image: URL.createObjectURL(file.image),
        })),
      ]);
    }
  }, [files, productImages]);

  const filterImage = (value) => {
    setFiles(files.filter((item) => item._id !== value));
    setImages(images.filter((item) => item._id !== value));
    
  };

  const handleAddFile = (e) => {
    const selected = e.target.files;
    setFiles([
      ...files,
      ...[...selected].map((file) => ({
        _id: getUid(),
        image: file,
      })),
    ]);
  };

  return (
    <div className={APShowCaseStyles.container}>
      <h3 className="mt-8 mb-4 font-semibold text-gray-600">Select Image(s)</h3>
      <div className="flex justify-center mb-8">
        <div className={APShowCaseStyles.galary}>
          {images.map((item, index) => (
            <div key={item._id} className={APShowCaseStyles.imageOptsContainer}>
              <div
                className={APShowCaseStyles.imageWrapper}
                style={{
                  border:
                    displayImage == index
                      ? "1px solid #F7A76C"
                      : "1px solid #aaa",
                }}
                onClick={() => setDisplayImage(index)}
              >
                <Image
                  src={item.image}
                  alt="Add Products"
                  layout="fill"
                  objectFit="contain"
                />

                {displayImage == index ? (
                  <div className={APShowCaseStyles.overlay}></div>
                ) : null}
              </div>
              <IoIosCloseCircle
                className={APShowCaseStyles.deleteIcon}
                size={30}
                onClick={() => filterImage(item._id)}
              />
            </div>
          ))}
        </div>

        <div className={APShowCaseStyles.imageWrapper}>
          <label htmlFor="avatar">
            <MdAddCircle size={35} className="text-blue-900 cursor-pointer" />
          </label>
          <input
            type="file"
            id="avatar"
            onChange={handleAddFile}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <div className={APShowCaseStyles.imageDisplay}>
        <div className={APShowCaseStyles.imageCase2}>
          <Image
            src={images[displayImage]?.image || "/images/placeholder.png"}
            alt="Product"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductShowCase;
