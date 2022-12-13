import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { CustomersList, OrderList } from "../../components/admin/lists";
import { useAppContext } from "../../context/AppContext";

function Customers() {

  return (
    <div>
      <Head>
        <title>Lilong International: Administrator</title>
        <meta
          name="description"
          content="Lilong International Marketplace. A place for purchase of all helath products"
        />
        <meta
          name="keywords"
          content="health, natural treatment, wellness, therapist, products, suana, Complementary medicine, chinese medicine, herbal medicine, cosmetics, medical devices, vitamins"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <CustomersList />
      </div>
    </div>
  );
}

Customers.layout = "L2";

export default Customers;
