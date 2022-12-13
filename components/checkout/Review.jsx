import { useAppContext } from "../../context/AppContext";
import Image from "next/image";
import ReviewStyles from "../../styles/checkout/Review.module.css";
import Link from "next/link";
import { TailSpin } from "react-loader-spinner";

const Review = () => {
  const { cartItems } = useAppContext();
  const numOfOrder = cartItems?.length;
  return (
    <div className={ReviewStyles.container}>
      <h2>Review Your Order - {numOfOrder} order(s)</h2>
      {cartItems ? (
        cartItems.map((item) => (
          <div className={ReviewStyles.wrapper} key={item._id}>
            <div className={ReviewStyles.imgWrapper}>
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className={ReviewStyles.details}>
              <h4>{item.name}</h4>
              <h5>&#8358;{item.price}</h5>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      ) : cartItems?.length === 0 ? (
        <h2>No Items In Cart</h2>
      ) : (
        <TailSpin />
      )}
      <Link href="/cart">
        <a className={ReviewStyles.btn}>Back to Cart</a>
      </Link>
    </div>
  );
};

export default Review;
