import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import PCatalogStyles from "../../styles/products/ProductsCatalog.module.css";
import Product from "../home/Product";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const ProductsCatalog = ({ products }) => {
  const [activePage, setActivePage] = useState(0);
  const { numProductCatPages, numProductPerCatPage } = useAppContext();

  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOption, setDropdownOption] = useState("Latest");

  const handleDropdownSelect = (value) => {
    setDropdownOption(value);
  };

  const handleSetActivePage = (value) => {
    setActivePage(value);
  };

  return (
    <div className={PCatalogStyles.container2}>
      <div className={PCatalogStyles.heading}>
        <h2>ALL PRODUCTS</h2>
        <div
          className={PCatalogStyles.sorting}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          Sorting: {dropdownOption}
          {showDropdown ? (
            <RiArrowDropUpLine className={PCatalogStyles.icon} />
          ) : (
            <RiArrowDropDownLine className={PCatalogStyles.icon} />
          )}
          {showDropdown && (
            <div className={PCatalogStyles.dropdown}>
              <span onClick={() => handleDropdownSelect("Latest")}>Latest</span>
              <span onClick={() => handleDropdownSelect("Popular")}>
                Popular
              </span>
              <span onClick={() => handleDropdownSelect("Low to High Cos")}>
                Low to High Cost
              </span>
              <span onClick={() => handleDropdownSelect("High to Low Cost")}>
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
        {products.slice(0, numProductPerCatPage).map((product) => (
          <div key={product._id} className={PCatalogStyles.product}>
            <Product
              _id={product._id}
              image={product.images[0]}
              alt={product.alt}
              category={product.category}
              name={product.name}
              price={product.price}
              actualPrice={product.actualPrice}
              link={product.link}
            />
          </div>
        ))}
      </div>

      <div className={PCatalogStyles.paginations}>
        <BsChevronLeft />
        {Array(numProductCatPages)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className={PCatalogStyles.page}
              style={
                activePage === index
                  ? { borderColor: "#1C6758" }
                  : { borderColor: "#ddd" }
              }
              onClick={() => handleSetActivePage(index)}
            >
              {index + 1}
            </div>
          ))}
        <BsChevronRight />
      </div>
    </div>
  );
};

export default ProductsCatalog;
