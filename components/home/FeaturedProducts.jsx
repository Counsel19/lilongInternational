import FProductsStyles from "../../styles/home/FeaturedProducts.module.css";
import Image from "next/image";
import Link from "next/link";
import Product from "./Product";
import { BsArrowRight } from "react-icons/bs";

const FeaturedProducts = ({ products }) => {
  return (
    <div className={FProductsStyles.container}>
      <div className={FProductsStyles.heading}>
        <h2>Featured Products</h2>
      </div>
      <div className={FProductsStyles.largeProducts}>
        <Link href="/products/three-person-suana">
          <a className={FProductsStyles.imgContainer}>
            <Image
              src="/images/three-person-suana.jpg"
              alt="three-person-suana"
              layout="fill"
              objectFit="cover"
            />
          </a>
        </Link>
        <Link href="/products/Hydrogen-banner">
          <a className={FProductsStyles.imgContainer}>
            <Image
              src="/images/Hydrogen-banner.jpg"
              alt="three-person-suana"
              layout="fill"
              objectFit="cover"
            />
          </a>
        </Link>
      </div>
      <div className={FProductsStyles.products}>
        {products.map((product) => (
          <div key={product._id} className={FProductsStyles.product}>
            <Product
              _id={product._id}
              image={product.images[0]}
              category={product.category}
              name={product.name}
              price={product.price}
              actualPrice={product.actualPrice}
              link={product.link}
              inStock={product.inStock}
            />
          </div>
        ))}
      </div>

      <div className={FProductsStyles.allProducts}>
        <Link href="/products">
          <a>
            All Products <BsArrowRight />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
