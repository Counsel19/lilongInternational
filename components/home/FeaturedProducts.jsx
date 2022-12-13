import FProductsStyles from "../../styles/home/FeaturedProducts.module.css";
import Image from "next/image";
import Link from "next/link";
import Product from "./Product";
import { BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppContext } from "../../context/AppContext";

const adsBanner = [
  {
    name: "three-person-suana",
    link: "/products/three-person-suana",
    src: "/images/three-person-suana.jpg",
  },
  {
    link: "/images/Hydrogen-banner.jpg",
    name: "Hydrogen-banner.jpg",
    src: "/images/Hydrogen-banner.jpg",
  },
];

const FeaturedProducts = ({ products }) => {
  const { moneyFormat } = useAppContext();
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  let productSettings = {
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
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  return (
    <div className={FProductsStyles.container}>
      <div className={FProductsStyles.heading}>
        <h2>Featured Products</h2>
      </div>
      <div className={FProductsStyles.largeProducts}>
        <Slider {...settings}>
          {adsBanner.map((item) => (
            <Link key={item.name} href={item.link}>
              <a className={FProductsStyles.imgContainer}>
                <Image
                  src={item.src}
                  alt={item.name}
                  height={350}
                  width={700}
                  objectFit="cover"
                />
              </a>
            </Link>
          ))}
        </Slider>
      </div>
      <div>
        <Slider {...productSettings}>
          {products.map((product) => (
            <div key={product._id} className={FProductsStyles.product}>
              <Product
                _id={product._id}
                image={product.images[0]}
                category={product.category}
                name={product.name}
                price={moneyFormat.format(product.price)}
                actualPrice={moneyFormat.format(product.actualPrice)}
                link={product.link}
                inStock={product.inStock}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className={FProductsStyles.allProducts}>
        <Link href="/products">
          <a className="text-center w-full">
            All Products <BsArrowRight />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
