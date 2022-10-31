import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import DeliveryAddress from "../../components/checkout/DeliveryAddress";
import OrderReview from "../../components/checkout/OrderReview";
import CartSummary from "../../components/cart/CartSummary";
import CheckoutStyles from "../../styles/checkout/Checkout.module.css";
import { useAppContext } from "../../context/AppContext";

const Checkout = () => {
  const { cartItems: cartProducts, user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });

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

      <div className={CheckoutStyles.container}>
        <h2>Checkout</h2>
        <div className={CheckoutStyles.wrapper}>
          <div className={CheckoutStyles.right}>
            <DeliveryAddress />
            <OrderReview products={cartProducts} />
          </div>
          <CartSummary products={cartProducts} checkout />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
