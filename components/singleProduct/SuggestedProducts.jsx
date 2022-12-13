import React from "react";
import Product from "../home/Product";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import SProductsStyles from "../../styles/home/FeaturedProducts.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SuggestedProducts = ({ products }) => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className={SProductsStyles.container2}>
      <div className={SProductsStyles.heading}>
        <h2>Suggested Products</h2>
      </div>
      <div>
        <Slider {...settings}>
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
        </Slider>
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
