import React from "react";
import Product from "../home/Product";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import SProductsStyles from "../../styles/home/FeaturedProducts.module.css";

const SuggestedProducts = ({ products }) => {

  return (
    <div className={SProductsStyles.container2}>
      <div className={SProductsStyles.heading}>
        <h2>Suggested Products</h2>
      </div>
      <div className={SProductsStyles.products}>
        {products.map((product) => (
          <div key={product._id} className={SProductsStyles.product}>
            <Product
              _id={product._id}
              image={product.images[0]}
              category={product.category}
              name={product.name}
              price={product.price}
              actualPrice={product.actualPrice}
              link={product.link}
            />
          </div>
        ))}
      </div>

      <div className={SProductsStyles.allProducts}>
        <Link href="/products">
          <a>
            All Products <BsArrowRight />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SuggestedProducts;
