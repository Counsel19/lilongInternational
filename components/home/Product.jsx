import Image from "next/image";
import ProductStyles from "../../styles/home/Product.module.css";
import { useRouter } from "next/router";

const Product = ({ _id, image, category, name, price, actualPrice, link }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push({
      pathname: link,
      query: { id: _id },
    });
  };

  return (
    <div className={ProductStyles.container} onClick={handleNavigate}>
      <div className={ProductStyles.wrapper}>
        <div className={ProductStyles.details}>
          <p>{category}</p>
          <h3>{name}</h3>
          <div className={ProductStyles.price}>
            <span>{actualPrice}</span>
            <span>{price}</span>
          </div>
        </div>
        <div className={ProductStyles.imgContainer}>
          <Image src={image} alt={name} layout="fill" objectFit="contain" />
        </div>
      </div>
    </div>
  );
};

export default Product;
