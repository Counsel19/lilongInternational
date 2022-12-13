import Specification from "../add/Specification";
import AddProductShowCase from "../add/AddProductShowCase";
import EditProductStyles from "../../../styles/admin/add/AddProduct.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

const TextEditor = dynamic(() => import("./EditTextEditor"), {
  ssr: false,
});

const getUid = () => uniqid.time();

const EditProduct = ({ categories, singleProduct }) => {
  const { editProduct, addNewCategory, criticalLoading } = useAppContext();
  const [num, setNum] = useState(1);
  const [addCategory, setAddCategory] = useState(false);
  const [files, setFiles] = useState([]);
  const [specNum, setSpecNum] = useState([
    {
      _id: getUid(),
      title: "",
      details: "",
    },
  ]);
  
  const [images, setImages] = useState(
    singleProduct.images
      ? [...singleProduct.images?.map((image) => ({ _id: getUid(), image }))]
      : []
  );
  const [newProduct, setNewProduct] = useState({});
  const [newCategory, setNewCatgory] = useState("");

  useEffect(() => {
    if (num > specNum.length) {
      setSpecNum([...specNum, { _id: getUid(), title: "", details: "" }]);
    }
  }, [num]);

  useEffect(() => {
    if (Object.keys(singleProduct).length > 0) {
      setNewProduct(singleProduct);
      setSpecNum(singleProduct.specification);
    }
  }, [singleProduct]);

  const addSpec = () => {
    setNum(num + 1);
  };

  const filterSpec = (value) => {
    if (num === 1) return;
    setSpecNum(specNum.filter((item) => item._id !== value));
    setNum(num - 1);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "featured" || name === "inStock") {
      value = e.target.checked;
    }

    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSpecChange = (e, id) => {
    const name = e.target.name;
    const value = e.target.value;

    setSpecNum((current) =>
      current.map((obj) => {
        if (obj._id === id) {
          return name === "title"
            ? { ...obj, title: value }
            : { ...obj, details: value };
        }

        return obj;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      const urls = await Promise.all(
        files.map(async (file) => {
          data.append("file", file.image);
          data.append("upload_preset", "upload");

          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/counselokpabi/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const imgStr = images.map(item => item.image)

      let productPayload = {
        ...newProduct,
        specification: specNum,
        link: `/products/${newProduct.name.split(" ").join("-")}`,
        images: [...urls, ...imgStr],
      };

      if (addCategory) {
        await addNewCategory({ name: newCategory });
        productPayload.category = newCategory;
      }

      await editProduct(productPayload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={EditProductStyles.container}>
      <h2 className="text-gray-600 font-bold text-xl my-4">Edit Product</h2>
      {Object.keys(newProduct).length > 0 ? (
        <div className={EditProductStyles.wrapper}>
          <div className={EditProductStyles.left}>
            {singleProduct.images && images ? (
              <AddProductShowCase
                productImages={singleProduct.images}
                files={files}
                setFiles={setFiles}
                images={images}
                setImages={setImages}
              />
            ) : (
              <TailSpin />
            )}
          </div>
          <form onSubmit={handleSubmit} className={EditProductStyles.right}>
            <div className="">
              <label className="mb-2 block font-semibold text-gray-600">
                Product Name
              </label>
              <input
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                type="text"
                className="mt-1 block w-full py-2 px-3  bg-gray-100 rounded-md  shadow-sm focus:border-none focus:outline-none focus:ring-none sm:text-sm"
              />
            </div>
            <div className="">
              <label className="mb-2 block font-semibold text-gray-600">
                Specification
              </label>

              {specNum.map((item) => (
                <Specification
                  key={item._id}
                  _id={item._id}
                  value={item}
                  handleChange={handleSpecChange}
                  addSpec={addSpec}
                  filterSpec={filterSpec}
                />
              ))}
            </div>
            <div className="">
              <label className="mb-2 block font-semibold text-gray-600">
                Features
              </label>
              {newProduct.features && (
                <TextEditor
                  name="features"
                  newProduct={newProduct}
                  setNewProduct={setNewProduct}
                />
              )}
            </div>
            <div className="">
              <label className="mb-2 block font-semibold text-gray-600">
                Benefits
              </label>

              {newProduct.benefits && (
                <TextEditor
                  name="benefits"
                  newProduct={newProduct}
                  setNewProduct={setNewProduct}
                />
              )}
            </div>
            <div className="flex gap-8 items-center">
              <div className="flex flex-col gap-2">
                <p className="mb-2 block font-semibold text-gray-600">
                  Should it be Featured?
                </p>
                <label className={EditProductStyles.switch}>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={newProduct.featured}
                    value={newProduct.featured}
                    onChange={handleChange}
                  />
                  <span
                    className={EditProductStyles.slider}
                    id={EditProductStyles.round}
                  ></span>
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <p className="mb-2 block font-semibold text-gray-600">
                  Is Product in Stock?
                </p>
                <label className={EditProductStyles.switch}>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={newProduct.inStock}
                    value={newProduct.inStock}
                    onChange={handleChange}
                  />
                  <span
                    className={EditProductStyles.slider}
                    id={EditProductStyles.round}
                  ></span>
                </label>
              </div>
            </div>
            <div>
              <label className="mb-2 block font-semibold text-gray-600">
                Category
              </label>
              {!addCategory && (
                <div className="flex items-center gap-4 justify-between">
                  {categories && (
                    <select
                      name="category"
                      value={newProduct.category}
                      onChange={handleChange}
                      type="text"
                      className="mt-1 block w-full py-2 px-3 bg-gray-100 rounded-md  shadow-sm focus:border-none focus:outline-none focus:ring-none sm:text-sm"
                    >
                      <option>Please Select a Category</option>
                      {categories &&
                        categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  )}

                  <IoMdAddCircle
                    size={30}
                    onClick={() => setAddCategory(true)}
                    className="cursor-pointer text-blue-800"
                  />
                </div>
              )}

              {addCategory && (
                <div>
                  <label className="mb-2 block font-base text-gray-600">
                    Add New Category
                  </label>
                  <div className="flex items-center gap-4 justify-between">
                    <input
                      name="category"
                      value={newCategory}
                      onChange={(e) => setNewCatgory(e.target.value)}
                      type="text"
                      className="mt-1 block w-full py-2 px-3 bg-gray-100 rounded-md  shadow-sm focus:border-none focus:outline-none focus:ring-none sm:text-sm"
                    />
                    <IoIosCloseCircle
                      size={30}
                      onClick={() => setAddCategory(false)}
                      className="cursor-pointer text-red-600"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 justify-between">
              <div className="flex-1 ">
                <label className="mb-2 block font-semibold text-gray-600">
                  Price
                </label>
                <input
                  name="actualPrice"
                  value={newProduct.actualPrice}
                  onChange={handleChange}
                  type="text"
                  className="mt-1 block w-full py-2 px-3 bg-gray-100 rounded-md  shadow-sm focus:border-none focus:outline-none focus:ring-none sm:text-sm"
                />
              </div>
              <div className="flex-1 ">
                <label className="mb-2 block font-semibold text-gray-600">
                  Selling Price
                </label>
                <input
                  name="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  type="text"
                  className="mt-1 block w-full py-2 px-3 bg-gray-100 rounded-md  shadow-sm focus:border-none focus:outline-none focus:ring-none sm:text-sm"
                />
              </div>
            </div>
            <div className="flex space-x-4 my-4">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-700 py-3 px-4 text-sm font-medium text-white disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Upload
              </button>
              <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-white py-3 border-blue-700 px-4 text-sm font-medium text-blue-700 disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <TailSpin />
      )}
      {criticalLoading && (
        <div className={EditProductStyles.loadingOverlay}>
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default EditProduct;
