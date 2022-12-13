import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";
import { MdDeleteOutline } from "react-icons/md";
import { FaLink, FaRegEdit } from "react-icons/fa";
import VideoLinkStyles from "../../styles/VideosLinks.module.css";

const init = {
  title: "",
  author: "",
  link: "",
};

function Orders() {
  const {
    getVideoLinks,
    updateVideoLink,
    deleteVideoLink,
    addVideoLink,
    user,
  } = useAppContext();

  const [vidoes, setVideos] = useState([]);
  const [errors, setError] = useState("");
  const [isEdit, setisEdit] = useState("");
  const [linkInput, setLinkInput] = useState(init);

  useEffect(() => {
    const getData = async () => {
      setVideos(await getVideoLinks());
    };
    getData();
  }, [user]);

  const setEdit = (item) => {
    setLinkInput({
      id: item._id,
      title: item.title,
      author: item.author,
      link: item.link,
    });
    setisEdit(true);
  };

  const handleDelete = async (id) => {
    setVideos(await deleteVideoLink(id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, link } = linkInput;
    if (!title || !author || !link) {
      setError("Please Fill all fields.");
    }
    if (isEdit) {
      setVideos(await updateVideoLink(linkInput.id, linkInput));
    } else {
      setVideos(await addVideoLink(linkInput));
    }
    setLinkInput(init);
  };

  return (
    <div>
      <Head>
        <title>Lilong International: Administrator</title>
        <meta
          name="description"
          content="Lilong International Marketplace. A place for purchase of all helath products"
        />
        <meta
          name="keywords"
          content="health, natural treatment, wellness, therapist, products, suana, Complementary medicine, chinese medicine, herbal medicine, cosmetics, medical devices, vitamins"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col lg:flex-row w-full gap-16">
        {vidoes ? (
          <div className="w-full flex flex-col gap-4">
            {vidoes.map((item) => (
              <div
                key={item.link}
                className="flex justify-between  rounded-sm w-full bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out transform"
              >
                <div className="flex gap-4 items-center">
                  <FaLink className={VideoLinkStyles.editIcon} size={28} />

                  <div>
                    <p className="text-blue-600 font-semibold">{item.title}</p>

                    <p className="text-sm text-gray-800 font-light">
                      {item.author}
                    </p>
                    <p className="text-sm text-rose-400 font-light">
                      {item.link}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <MdDeleteOutline
                    onClick={() => handleDelete(item._id)}
                    className={VideoLinkStyles.deleteIcon}
                    size={25}
                  />
                  <FaRegEdit
                    onClick={() => setEdit(item)}
                    className={VideoLinkStyles.editIcon}
                    size={22}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <TailSpin />
        )}
        <form className="w-full" onSubmit={handleSubmit}>
          {errors && <span className="text-rose-500 mb-4">{errors}</span>}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-base font-semibold text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={linkInput.title}
              onChange={(e) =>
                setLinkInput({ ...linkInput, title: e.target.value })
              }
              autoComplete="title"
              className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="firstname"
              className="block text-base font-semibold text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              onChange={(e) =>
                setLinkInput({ ...linkInput, author: e.target.value })
              }
              value={linkInput.author}
              autoComplete="author"
              className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="link"
              className="block text-base font-semibold text-gray-700"
            >
              Link
            </label>
            <input
              type="text"
              name="link"
              id="link"
              onChange={(e) =>
                setLinkInput({ ...linkInput, link: e.target.value })
              }
              value={linkInput.link}
              autoComplete="link"
              className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
            />
          </div>
          <button
            type="submit"
            className=" my-8 py-2 px-3 bg-white text-blue-700 border rounded border-blue-700"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
}

Orders.layout = "L2";

export default Orders;
