import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import CartItemStyles from "../../styles/cart/CartItem.module.css";

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

const CartItem = ({ cartProduct }) => {
  const [quantity, setQuantity] = useState(cartProduct.quantity);

  const { isLoading, handleAddToCart, handleRemoveFromCart } = useAppContext();

  useDidMountEffect(() => {
    handleAddToCart(cartProduct, quantity);
  }, [quantity]);

  const changeQuantity = (action) => {
    if (action === "-") {
      quantity > 1 ? setQuantity(quantity - 1) : null;
    }
    if (action === "+") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className={CartItemStyles.container}>
      <div className={CartItemStyles.productInfo}>
        <Link href="/shop/url/">
          <a className={CartItemStyles.imageWrapper}>
            <Image
              src={cartProduct.image}
              alt={cartProduct.name}
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>

        <div className={CartItemStyles.details}>
          <h3>{cartProduct.name}</h3>
          <div className={CartItemStyles.prices}>
            <h4>${cartProduct.price}</h4>
            <span>${cartProduct.actualPrice}</span>
          </div>
          <span>{cartProduct.inStock ? "In Stock" : "Not in Stock"}</span>

          <div className={CartItemStyles.selectQuantity}>
            <span onClick={() => changeQuantity("-")}>-</span>
            <span>{quantity}</span>
            <span onClick={() => changeQuantity("+")}>+</span>
          </div>
        </div>
      </div>

      {isLoading && (
        <Image
          src="/images/spin.gif"
          alt="Loading"
          height={50}
          width={50}
          objectFit="contain"
        />
      )}

      <div className={CartItemStyles.action}>
        <span onClick={() => handleRemoveFromCart(cartProduct._id)}>
          Remove Item
        </span>
      </div>
    </div>
  );
};

export default CartItem;
