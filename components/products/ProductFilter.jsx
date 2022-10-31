import Link from "next/link";
import { useState } from "react";
import PFilterStyles from "../../styles/products/ProductFilter.module.css";

const ProductFilter = ({ categories, prices }) => {

  const [showOptions, setShowOptions] = useState({
    categories: true,
    brands: true,
    prices: true,
  });

  return (
    <div className={PFilterStyles.container}>
      <div className={PFilterStyles.categories}>
        <div
          className={PFilterStyles.heading}
          onClick={() =>
            setShowOptions({
              ...showOptions,
              categories: !showOptions.categories,
            })
          }
        >
          <h4>Categories</h4>
          <span>{showOptions.categories ? "-" : "+"}</span>
        </div>
        {showOptions.categories && (
          <div className={PFilterStyles.options}>
            {categories.map((category) => (
              <div key={category._id} className={PFilterStyles.option}>
                <span className={PFilterStyles.detail}>{category.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className={PFilterStyles.prices}>
        <div
          className={PFilterStyles.heading}
          onClick={() =>
            setShowOptions({ ...showOptions, prices: !showOptions.prices })
          }
        >
          <h4>Prices</h4>
          <span>{showOptions.prices ? "-" : "+"}</span>
        </div>
        {showOptions.prices && (
          <div className={PFilterStyles.options}>
            {prices.map((price) => (
              <div key={price.id} className={PFilterStyles.option}>
                <input type="checkbox" name="price" id={`price-${price.id}`} />
                <label htmlFor={`price-${price.id}`} className={PFilterStyles.name}>
                  {price.price}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
