import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { useAppContext } from "../context/AppContext";

const SearchModal = ({ orders }) => {
  const { handleInputChange } = useAppContext();
  const [localInputSearch, setLocalSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!orders) {
      handleInputChange("search", localInputSearch);
      handleInputChange("showSearchModal", false);
      router.push("/products");
    } else {
      handleInputChange("orderSearch", localInputSearch);
      handleInputChange("showSearchModal", false);
      router.push("/orders");
    }
  };

  return (
    <div className="w-full m-2 md:w-1/3 md:mx-auto relative">
      <div className="flex flex-col p-5 rounded-lg shadow bg-white">
        <span style={{ color: "red" }}>
          <GrClose
            className="absolute top-4 right-4 cursor-pointer"
            size={22}
            onClick={() => handleInputChange("showSearchModal", false)}
          />
        </span>

        <div className="flex flex-col items-center gap-4">
          <Image
            src="/images/search-out.gif"
            alt="search"
            height={60}
            width={60}
          />

          <div className="w-full">
            <div className="flex gap-2 items-center">
              <input
                className=" block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
                type="text"
                name="localInputSearch"
                value={localInputSearch}
                onChange={(e) => setLocalSearchInput(e.target.value)}
                placeholder={!orders ? `Search Products` : "Search Your Orders"}
              />
              <button
                onClick={handleSearch}
                className=" bg-blue-800 text-white py-2 px-3 rounded-md"
              >
                <IoSearch size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
