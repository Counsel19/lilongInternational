import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import ViewOrder from "../../../components/admin/view/ViewOrder";
import TrackOrder from "../../../components/TrackOrder";
import { useAppContext } from "../../../context/AppContext";
import dbConnect from "../../../lib/mongodb";
import ProductPayment from "../../../models/ProductPayment";

function Orders({ purchase }) {
  const { getSingleProductsPayment } = useAppContext();

  const [currentStatus, setCurrentStatus] = useState(purchase?.state);
  const [singlePurchase, setSinglePurchase] = useState(purchase);



  useEffect(() => {
    if (purchase) {
      getSingleProductsPayment(purchase._id)
        .then((res) => {
          console.log(res);
          setSinglePurchase(res);
        })
        .catch((err) => console.log(err));
    }
  }, [currentStatus, purchase]);

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
        {singlePurchase ? (
          <>
            <TrackOrder
              id={singlePurchase._id}
              setCurrentStatus={setCurrentStatus}
              orderStatus={singlePurchase.state}
              isAdmin={true}
            />
            <ViewOrder singlePurchase={singlePurchase} />
          </>
        ) : (
          <TailSpin />
        )}
      </div>
    </div>
  );
}

Orders.layout = "L2";

export const getServerSideProps = async (context) => {
  let purchase = null;

  try {
    await dbConnect();
    const { id } = context.query;
    purchase = await ProductPayment.findById(id);

    purchase.amount = purchase.amount / 100;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      purchase: JSON.parse(JSON.stringify(purchase)),
    },
  };
};

export default Orders;
