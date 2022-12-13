import CartListStyles from "../../styles/cart/CartList.module.css";
import CartItem from "./CartItem";

const CartList = ({ cartProducts, checkout }) => {
  return (
    <div
      className={
        !checkout ? CartListStyles.container : CartListStyles.container2
      }
    >
      {cartProducts?.length === 0 ? (
        <h3>No Items in Cart</h3>
      ) : (
        cartProducts?.map((product, index) => (
          <div className={CartListStyles.itemWrapper} key={product?._id}>
            <div className={CartListStyles.serialNum}>{index + 1}</div>
            <CartItem product={product} />
          </div>
        ))
      )}
    </div>
  );
};

export default CartList;
