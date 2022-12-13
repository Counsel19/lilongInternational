import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import PFilterStyles from "../../styles/products/ProductFilter.module.css";

const ProductFilter = ({ categories, prices }) => {
  const [showOptions, setShowOptions] = useState({
    categories: true,
    brands: true,
    prices: true,
  });

  const { handleInputChange, productCategoryFilter } = useAppContext();

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
            <div
              className={PFilterStyles.option}
              style={productCategoryFilter === "all" ? { borderLeft:"2px solid #172155"  }: null}
              onClick={() => handleInputChange("productCategoryFilter", "all")}
            >
              <span className={PFilterStyles.detail}>All</span>
            </div>
            {categories.map((category) => (
              <div
                key={category._id}
                className={PFilterStyles.option}
                style={productCategoryFilter === category.name ? { borderLeft:"2px solid #172155"  }: null}
                onClick={() =>
                  handleInputChange("productCategoryFilter", category.name)
                }
              >
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
          <h4>Prices(&#8358;)</h4>
          <span>{showOptions.prices ? "-" : "+"}</span>
        </div>
        {showOptions.prices && (
          <div className={PFilterStyles.options}>
            <div
              className={PFilterStyles.option2}
              onClick={() => handleInputChange("productPriceFilter", "all")}
            >
              <input type="radio" name="price" id={`price-all}`} />
              <label htmlFor={`price-all}`} className={PFilterStyles.name}>
                All
              </label>
            </div>
            {prices.map((price) => (
              <div
                key={price.id}
                className={PFilterStyles.option2}
                onClick={() =>
                  handleInputChange("productPriceFilter", price.price)
                }
              >
                <input type="radio" name="price" id={`price-${price.id}`} />
                <label
                  htmlFor={`price-${price.id}`}
                  className={PFilterStyles.name}
                >
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
