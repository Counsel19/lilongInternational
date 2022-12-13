import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import SavedItemStyles from "../../styles/cart/CartItem.module.css";

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

const SavedItem = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const { isLoading, handleAddToSaved, handleRemoveFromSaved } =
    useAppContext();
  const router = useRouter();

  const handleNavigate = () => {
    router.push({
      pathname: product.link,
      query: { id: product.productId },
    });
  };

  useDidMountEffect(() => {
    handleAddToSaved(product, quantity, "fromSaved");
  }, [quantity]);

  return (
    <div className={SavedItemStyles.container}>
      <div className={SavedItemStyles.productInfo}>
        <div className={SavedItemStyles.imageWrapper} onClick={handleNavigate}>
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className={SavedItemStyles.details}>
          <h3>{product.name}</h3>
          <div className={SavedItemStyles.prices}>
            <h4>${product.price}</h4>
            <span>${product.actualPrice}</span>
          </div>
          <span>{product.inStock ? "In Stock" : "Not in Stock"}</span>
        </div>
      </div>

      <div className={SavedItemStyles.action}>
        <Link href={`${product.link}?id=${product.productId}`}>
          <a>Buy Now</a>
        </Link>
        <span onClick={() => handleRemoveFromSaved(product._id)}>
          Remove Item
        </span>
      </div>
    </div>
  );
};

export default SavedItem;
