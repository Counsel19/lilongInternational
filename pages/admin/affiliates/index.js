import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { AllAffiliateList } from "../../../components/admin/lists";
import { useAppContext } from "../../../context/AppContext";

function AdminAffiliate() {


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
        <AllAffiliateList />
      </div>
    </div>
  );
}

AdminAffiliate.layout = "L2";

export default AdminAffiliate;
