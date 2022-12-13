import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import PaginationStyles from "../styles/products/ProductsCatalog.module.css";
import { useAppContext } from "../context/AppContext";

const Pagination = ({ numOfPages }) => {
  const { handleInputChange } = useAppContext();

  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    handleInputChange("page", activePage + 1);
  }, [activePage]);

  const handleSetActivePage = (value) => {
    setActivePage(value);
  };

  const handleNext = () => {

    if (activePage < numOfPages - 1) {
      return setActivePage(activePage + 1);
    }
  };
  const handlePrev = () => {
    if (activePage > 0) {
      return setActivePage(activePage - 1);
    }
  };

  return (
    <div className={PaginationStyles.paginations}>
      <BsChevronLeft
        onClick={handlePrev}
        size={22}
        className="cursor-pointer"
      />
      {Array(numOfPages)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className={PaginationStyles.page}
            style={
              activePage === index
                ? {
                    borderColor: "#fff",
                    backgroundColor: "#1e3a8a",
                    color: "#fff",
                  }
                : { borderColor: "#ddd" }
            }
            onClick={() => handleSetActivePage(index)}
          >
            {index + 1}
          </div>
        ))}
      <BsChevronRight
        onClick={handleNext}
        size={22}
        className="cursor-pointer"
      />
    </div>
  );
};

export default Pagination;
