import Head from "next/head";
import { useEffect } from "react";
import DeliveryAddress from "../../components/checkout/DeliveryAddress";
import OrderReview from "../../components/checkout/OrderReview";
import CartSummary from "../../components/cart/CartSummary";
import CheckoutStyles from "../../styles/checkout/Checkout.module.css";
import { useAppContext } from "../../context/AppContext";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

const Checkout = () => {
  const { cartItems: cartProducts, user, isLoading } = useAppContext();

  return (
    <div>
      <Head>
        <title>Lilong International: Checkout</title>
        <meta
          name="description"
          content="Beulah Health Solution Marketplace. A place for purchase of all helath products"
        />
        <meta
          name="keywords"
          content="health, natural treatment, wellness, therapist, products, suana, Complementary medicine, chinese medicine, herbal medicine, cosmetics, medical devices, vitamins"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? (
        <div className="w-full flex items-center justify-center">
          <TailSpin />
        </div>
      ) : (
        <div className={CheckoutStyles.container}>
          <h2>Checkout</h2>
          <div className={CheckoutStyles.wrapper}>
            <div className={CheckoutStyles.right}>
              <DeliveryAddress />
              <OrderReview cartProducts={cartProducts} />
            </div>
            <CartSummary products={cartProducts} checkout />
          </div>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Checkout;
