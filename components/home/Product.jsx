import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import ProductStyles from "../../styles/home/Product.module.css";
import { useRouter } from "next/router";
import { useAppContext } from "../../context/AppContext";

const Product = ({
  _id,
  image,
  category,
  name,
  price,
  actualPrice,
  link,
  inStock,
}) => {
  const router = useRouter();
  const { handleAddToCart } = useAppContext();
  const handleNavigate = () => {
    router.push({
      pathname: link,
      query: { id: _id },
    });
  };

  const EnhanceAddTocart = () => {
    handleAddToCart(
      { _id, image, category, name, price, actualPrice, inStock, link },
      1
    );
    router.push("/cart")
  };

  return (
    <div className={ProductStyles.container}>
      <div>
        <a>
          <div className={ProductStyles.wrapper}>
            <div className={ProductStyles.details}>
              <p>{category}</p>
              <h3>{name}</h3>
              <div className={ProductStyles.price}>
                <span>${actualPrice}</span>
                <span>${price}</span>
              </div>
            </div>
            <div
              className={ProductStyles.imgContainer}
              onClick={handleNavigate}
            >
              <Image src={image} alt={name} layout="fill" objectFit="contain" />
            </div>

            <div className={ProductStyles.btn}>
              <button onClick={EnhanceAddTocart}>
                <BsCart3 className={ProductStyles.icon} />
                Add to Cart
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Product;
