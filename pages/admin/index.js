import Head from "next/head";
import { AdminTop, StatsCard } from "../../components/admin";
import { DoughnutChart, LineChart } from "../../components/admin/charts";
import {
  PendingAffiliateList,
  RecentTransactions,
} from "../../components/admin/lists";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import Featured from "../../components/admin/Featured";
import { TailSpin } from "react-loader-spinner";

function Dashboard() {
  const { getStats, moneyFormat, cardsInfo, ordersState, user } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getStats();
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
        {!cardsInfo ? (
          <div className="w-full flex items-center justify-center">
            <TailSpin />
          </div>
        ) : (
          <>
            <AdminTop />
            <div className="flex gap-4 mb-8 flex-wrap lg:flex-nowrap">
              {cardsInfo.map((item, index) => (
                <StatsCard
                  key={index}
                  index={index}
                  name={item.name}
                  number={item.name === "Revenue" ? moneyFormat.format(item.number): item.number}
                />
              ))}
            </div>
            <div className="flex gap-4 mb-8 flex-col lg:flex-row">
              <Featured />
              <PendingAffiliateList />
            </div>
            <div className="flex gap-4 flex-col lg:flex-row">
              <LineChart />
              <DoughnutChart data={ordersState} />
            </div>

            <RecentTransactions />
          </>
        )}
      </div>
    </div>
  );
}

Dashboard.layout = "L2";

export default Dashboard;
