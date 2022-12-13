import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import PCatalogStyles from "../../styles/products/ProductsCatalog.module.css";
import Product from "../home/Product";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import Pagination from "../Pagination";
import Image from "next/image";
import { BsFilter } from "react-icons/bs";

const ProductsCatalog = ({ products }) => {
  const {
    limit,
    numOfPages,
    moneyFormat,
    handleInputChange,
    search,
  } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const [dropdownOption, setDropdownOption] = useState({
    name: "Latest",
    sortParams: "latest",
  });

  const handleSetActivePage = (value) => {
    setActivePage(value);
  };

  useEffect(() => {
    handleInputChange("sort", dropdownOption.sortParams);
  }, [dropdownOption]);

  return (
    <div className={PCatalogStyles.container2}>
      <h2>ALL PRODUCTS</h2>
      <div className={PCatalogStyles.heading}>
        <div className="flex gap-2 items-center">
          {/* <input
            className=" block w-full py-1 px-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
            type="search"
            name="search"
            value={search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            placeholder="Search Products"
          /> */}

          <div className="relative w-full max-w-md sm:-ml-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="absolute h-6 w-6 mt-2.5 ml-2 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="search"
              role="search"
              name="search"
              value={search}
              placeholder="Search Products"
              onChange={(e) => handleInputChange("search", e.target.value)}
              className="py-2 pl-10 pr-4 w-full border-4 border-transparent placeholder-gray-400 focus:bg-gray-50 rounded-lg"
          />
          </div>
         
        </div>
        <div
          className={PCatalogStyles.sorting}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className={PCatalogStyles.sortType}>
            Sorting: {dropdownOption.name}
            {showDropdown ? (
              <RiArrowDropUpLine className={PCatalogStyles.icon} />
            ) : (
              <RiArrowDropDownLine className={PCatalogStyles.icon} />
            )}
          </span>
          <BsFilter className={PCatalogStyles.filterIcon} />
          {showDropdown && (
            <div className={PCatalogStyles.dropdown}>
              <span
                onClick={() =>
                  setDropdownOption({ name: "Latest", sortParams: "latest" })
                }
              >
                Latest
              </span>

              <span
                onClick={() =>
                  setDropdownOption({
                    name: "Low to High Cost",
                    sortParams: "low-to-high",
                  })
                }
              >
                Low to High Cost
              </span>
              <span
                onClick={() =>
                  setDropdownOption({
                    name: "High to Low Cost",
                    sortParams: "high-to-low",
                  })
                }
              >
                High to Low Cost
              </span>
            </div>
          )}
        </div>
      </div>
      <div
        className={PCatalogStyles.products}
        id={PCatalogStyles.products}
        style={{ flexWrap: "wrap" }}
      >
        {products.length > 0 ? (
          products.slice(0, limit).map((product) => (
            <div key={product._id} className={PCatalogStyles.product}>
              <Product
                _id={product._id}
                image={product.images[0]}
                alt={product.alt}
                category={product.category}
                name={product.name}
                price={moneyFormat.format(product.price)}
                actualPrice={moneyFormat.format(product.actualPrice)}
                link={product.link}
              />
            </div>
          ))
        ) : (
          <p className="text-xl font-semibold my-12 text-gray-500 w-full text-center">
            No Products to Display
          </p>
        )}
      </div>
      <div className="pt-12">
        {numOfPages > 1 && <Pagination numOfPages={numOfPages} />}
      </div>
    </div>
  );
};

export default ProductsCatalog;
