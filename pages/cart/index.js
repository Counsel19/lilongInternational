import Head from "next/head";
import React, { useEffect } from "react";
import CartList from "../../components/cart/CartList";
import CartSummary from "../../components/cart/CartSummary";
import { useAppContext } from "../../context/AppContext";
import CartStyles from "../../styles/cart/Cart.module.css";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

const Cart = () => {
  const { cartItems: cartProducts, user } = useAppContext();


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

      <>
        {!user ? (
          <div className="w-full flex items-center justify-center">
            <TailSpin />
          </div>
        ) : (
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
             {cartProducts ? <CartSummary cartProducts={cartProducts} />: <TailSpin /> }
            </div>
          </div>
        )}
      </>
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

export default Cart;
