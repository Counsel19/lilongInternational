import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import CartSummaryStyles from "../../styles/cart/CartSummary.module.css";
import { GrSecure } from "react-icons/gr";

const CartSummary = ({ cartProducts, checkout }) => {
  const { subTotal, numOfCartItems, user } = useAppContext();

  return (
    <div className={CartSummaryStyles.container}>
      <h3>
        Cart Overview - <span>{numOfCartItems} item(s)</span>
      </h3>

      <div className={CartSummaryStyles.item}>
        <h5>Delivery: </h5>
        <span className={CartSummaryStyles.delivery}>
          Delivery charge not included yet.
        </span>
      </div>
      <div className={CartSummaryStyles.item}>
        <h5>Subtotal: </h5>
        <span className={CartSummaryStyles.subPrice}>&#8358;{subTotal}</span>
      </div>
      <div className={CartSummaryStyles.item}>
        <h5 className={CartSummaryStyles.price}>Total: </h5>
        <span className={CartSummaryStyles.price}>&#8358;{subTotal}</span>
      </div>

      {!checkout && (
        <Link href="/checkout">
          <a>
            <button
              className={CartSummaryStyles.btn}
              disabled={cartProducts.length === 0}
            >
              Proceed to Checkout
            </button>
          </a>
        </Link>
      )}

      {checkout && (
        <div className={CartSummaryStyles.paymentInfo}>
          <div className={CartSummaryStyles.paymentStreams}>
            <span>We accept</span>
            <Image
              src="/images/MasterCard.png"
              alt="MasterCard Logo"
              width={35}
              height={35}
              objectFit="contain"
            />
            <Image
              src="/images/visa-logo.jpg"
              alt="visa Logo"
              width={35}
              height={35}
              objectFit="contain"
            />
            <Image
              src="/images/Verve-Logo.png"
              alt="Verve Logo"
              width={35}
              height={35}
              objectFit="contain"
            />
          </div>
          <p>
            <GrSecure className={CartSummaryStyles.icon} /> Payments are 100%
            secured
          </p>

          <Link href="/checkout/payment">
            <a>
              <button
                className={CartSummaryStyles.btn}
                disabled={
                  cartProducts?.length === 0 ||
                  !user?.deliveryAddress ||
                  !user?.phone
                }
              >
                Proceed to Payment
              </button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
