import { useState } from "react";
import { BsCart3, BsSuitHeart } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import PInfoStyles from "../../styles/singleProduct/PurchaseInfo.module.css";
import { useAppContext } from "../../context/AppContext";
import { useRouter } from "next/router";
import Link from "next/link";

const PurchaseInfo = ({ product }) => {
  const { isItemInCart, handleAddToCart, handleAddToSaved } = useAppContext();

  const initialQuantity = 1;
  //isItemInCart will return the quantity of the item if in cart else 0
  const [quantity, setQuantity] = useState(isItemInCart(product));
  const router = useRouter();

  const changeQuantity = (action) => {
    if (action === "-") {
      quantity > 1 ? setQuantity(quantity - 1) : null;
    }
    if (action === "+") {
      quantity === 0 ? setQuantity(quantity + 2) : setQuantity(quantity + 1);
    }
  };



  const handleCartActions = () => {
    const increasedQuantity = quantity === 0 ? quantity + 1 : quantity;
    handleAddToCart(product, increasedQuantity);
    router.push("/cart/");
  };

  const handleSavedActions = () => {
    handleAddToSaved(product, quantity);
    router.push("/saved");
  };

  return (
    <div className={PInfoStyles.container}>
      <div className={PInfoStyles.productInfo}>
        <div className={PInfoStyles.header}>
          <p>{product.category}</p>
          <h2>{product.name}</h2>
        </div>

        <div className={PInfoStyles.purchase}>
          <div className={PInfoStyles.purchasePrice}>
            <h3>${product.price}</h3>
            <span>${product.actualPrice}</span>
          </div>
          <span>{product.inStock ? "In Stock" : "Not in Stock"}</span>

          <div className={PInfoStyles.quantity}>
            <h4>Quantity:</h4>
            <div className={PInfoStyles.selectQuantity}>
              <span onClick={() => changeQuantity("-")}>-</span>
              <span>{quantity || initialQuantity}</span>
              <span onClick={() => changeQuantity("+")}>+</span>
            </div>
          </div>

          {isItemInCart(product) ? (
            <p>Item Already in cart, Proceed to Purchase</p>
          ) : null}

          <div className={PInfoStyles.purchaseBtn}>
            {!isItemInCart(product) && (
              <button onClick={handleCartActions}>
                <BsCart3 className={PInfoStyles.icon} />
                Add to Cart
              </button>
            )}
            {isItemInCart(product) ? (
              <Link href="/checkout">
                <a>
                  <FiShoppingBag className={PInfoStyles.icon} /> Proceed
                  Purchase
                </a>
              </Link>
            ) : null}
            <button onClick={handleSavedActions}>
              <BsSuitHeart className={PInfoStyles.icon} /> Save for Later
            </button>
          </div>
        </div>
      </div>

     

      <div className={PInfoStyles.seller}>
        <h4>Sold by</h4>
        <span>Beulah Health Solution</span>
        <span>100% Assurance</span>
      </div>
    </div>
  );
};

export default PurchaseInfo;
