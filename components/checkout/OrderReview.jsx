import CartList from "../../components/cart/CartList";
import OrderReviewStyles from "../../styles/checkout/OrderReview.module.css";

const OrderReview = ({ cartProducts }) => {

  return (
    <div className={OrderReviewStyles.container}>
      <h3>Review Your Orders</h3>
      <CartList cartProducts={cartProducts} checkout />
    </div>
  );
};

export default OrderReview;
