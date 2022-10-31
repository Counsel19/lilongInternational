import CartList from "../../components/cart/CartList";
import OrdeeReviewStyles  from "../../styles/checkout/OrderReview.module.css"

const OrderReview = ({ products }) => {
  return (
    <div className={OrdeeReviewStyles.container}>
      <h3>Review Your Orders</h3>
      <CartList products={products} checkout />
    </div>
  );
};

export default OrderReview;
