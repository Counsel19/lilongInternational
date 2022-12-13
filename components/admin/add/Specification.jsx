import { IoIosCloseCircle, IoMdAddCircle } from "react-icons/io";

const Specification = ({

  _id,
  value,
  handleChange,
  addSpec,
  filterSpec,
}) => {

  return (
    <div className="flex gap-4 mb-4 items-center justify-between">
      <div className="flex-1">
        <label className="mb-2 block font-base text-gray-600">Title</label>
        <input
          value={value.title}
          name="title"
          onChange={(e) => handleChange(e, _id)}
          type="text"
          className="mt-1 block w-full py-2 px-3 bg-gray-100 rounded-md  shadow-sm focus:border-none focus:outline-none focus:ring-none sm:text-sm"
        />
      </div>
      <div className="flex-1">
        <label className="mb-2 block font-base text-gray-600">Details</label>
        <textarea
          rows={1}
          cols={5}
          value={value.details}
          name="details"
          onChange={(e) => handleChange(e, _id)}
          type="text"
          className="mt-1 block w-full py-2 px-3 bg-gray-100 rounded-md  shadow-sm focus:border-none focus:outline-none focus:ring-none sm:text-sm"
        />
      </div>
      <div className="flex items-center flex-col">
        <IoMdAddCircle
          size={30}
          onClick={addSpec}
          className="cursor-pointer text-blue-800"
        />
        <IoIosCloseCircle
          size={30}
          onClick={() => filterSpec(_id)}
          className="cursor-pointer text-red-600"
        />
      </div>
    </div>
  );
};

export default Specification;
