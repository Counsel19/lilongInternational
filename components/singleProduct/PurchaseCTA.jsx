import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useAppContext } from "../../context/AppContext";
import PCTAStyles from "../../styles/singleProduct/PurchaseCTA.module.css";
import { useRouter } from "next/router";

const PurchaseCTA = ({ product }) => {
  const { isItemInCart, handleAddToCart } = useAppContext();
  const [quantity, setQuantity] = useState(isItemInCart(product));
  const router = useRouter();

  const handleCartActions = () => {
    const increasedQuantity = quantity === 0 ? quantity + 1 : quantity;
    handleAddToCart(product, increasedQuantity);
    router.push("/cart/");
  };

  return (
    <div className={PCTAStyles.container}>
      <div className={PCTAStyles.imageWrapper}>
        <Image
          src={product.images[0]}
          alt={product.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={PCTAStyles.details}>
        <h3>{product.name}</h3>

        <div className={PCTAStyles.price}>
          <h4>${product.price}</h4>
          <span>${product.actualPrice}</span>
        </div>

        {isItemInCart(product) ? (
          <Link href="/checkout">
            <a>
              <button>
                <BsCart3 className={PurchaseCTA.icon} /> Buy Now
              </button>
            </a>
          </Link>
        ) : (
          <span onClick={handleCartActions}>
            <a>
              <button>
                <BsCart3 className={PurchaseCTA.icon} /> Add to Cart
              </button>
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default PurchaseCTA;
