import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CheckoutStyles from "../../styles/checkout/Checkout.module.css";
import { useAppContext } from "../../context/AppContext";
import { Total, PaymentMethod } from "../../components/checkout";
import Review from "../../components/checkout/Review";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

const Checkout = () => {
  const { cartItems: cartProducts, user, isLoading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Lilong International: Payment Method</title>
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
        <h2>Payment Method</h2>
        <div className={CheckoutStyles.wrapper}>
          <div className={CheckoutStyles.right}>
            <PaymentMethod />
            <Review />
          </div>
          <Total />
        </div>
      </div>
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
