import Head from "next/head";
import React, { useEffect } from "react";
import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import { useAppContext } from "../../context/AppContext";
import CartStyles from "../../styles/cart/Cart.module.css";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const Cart = () => {
  const { cartItems: cartProducts, user, handleGetCart } = useAppContext();

  useEffect(() => {
    handleGetCart();
  }, []);

  return (
    <div>
      <Head>
        <title>Beulah Health: Cart Overview</title>
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

      <div className={CartStyles.container}>
        <Link href="/products">
          <a>
            <BsArrowLeft /> Continue to shop
          </a>
        </Link>
        <h1>
          Your Cart{" "}
          {user && (
            <span>
              - Hello {user.firstname} {user.lastname}, below are your cart
              items
            </span>
          )}
        </h1>
        <div className={CartStyles.details}>
          <CartList cartProducts={cartProducts} />
          <CartSummary cartProducts={cartProducts} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
