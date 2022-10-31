import CartListStyles from "../../styles/cart/CartList.module.css";
import CartItem from "./CartItem";
import Image from "next/image";

const CartList = ({ cartProducts, checkout }) => {
  return (
    <div
      className={
        !checkout ? CartListStyles.container : CartListStyles.container2
      }
    >
      {cartProducts?.length === 0 ? (
        <h3>
          No Items in Cart{" "}
          
        </h3>
      ) : (
        cartProducts?.map((cartProduct, index) => (
          <div className={CartListStyles.itemWrapper} key={cartProduct?._id}>
            <div className={CartListStyles.serialNum}>{index + 1}</div>
            <CartItem cartProduct={cartProduct} />
          </div>
        ))
      )}
    </div>
  );
};

export default CartList;
