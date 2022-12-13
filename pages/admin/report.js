import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  CustomersAreaGraph,
  DoughnutChart,
  GeoBarChart,
} from "../../components/admin/charts";
import { useAppContext } from "../../context/AppContext";

function Orders() {
  const { getReportStats, user, bestSellingProducts } =
    useAppContext();
 
  const [data, setData] = useState([]);



  useEffect(() => {
    setData(
      bestSellingProducts?.map((item) => ({
        name: item.name,
        count: item.quantity,
      }))
    );
  }, [bestSellingProducts, user]);

  useEffect(() => {
    const getData = async () => {
      await getReportStats();
    };
    getData();
  }, [user]);

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
        <div className="flex flex-col lg:flex-row gap-8 mb-8 ">
          <GeoBarChart />
          <DoughnutChart data={data} bestSeller={true} />
        </div>
        <CustomersAreaGraph />
      </div>
    </div>
  );
}

Orders.layout = "L2";

export default Orders;
