import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
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

const CartItem = ({ product }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const { isLoading, handleAddToCart, handleRemoveFromCart } = useAppContext();
  const router = useRouter();

  const handleNavigate = () => {
    router.push({
      pathname: product.link,
      query: { id: product.productId },
    });
  };

  useDidMountEffect(() => {
    handleAddToCart(product, quantity, "fromCart");
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
        <div className={CartItemStyles.imageWrapper} onClick={handleNavigate}>
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className={CartItemStyles.details}>
          <h3>{product.name}</h3>
          <div className={CartItemStyles.prices}>
            <h4>&#8358;{product.price}</h4>
            <span>&#8358;{product.actualPrice}</span>
          </div>
          <span>{product.inStock ? "In Stock" : "Not in Stock"}</span>

          <div className={CartItemStyles.selectQuantity}>
            <span onClick={() => changeQuantity("-")}>-</span>
            <span>{quantity}</span>
            <span onClick={() => changeQuantity("+")}>+</span>
          </div>
        </div>
      </div>

      <div className={CartItemStyles.action}>
        <div onClick={() => handleRemoveFromCart(product._id)}>
          <span>Remove Item</span>
          <MdDeleteOutline className={CartItemStyles.removeIcon} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
