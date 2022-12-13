import FeaturedStyles from "../../styles/admin/Featured.module.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";

const Featured = () => {
  const { todayStats } = useAppContext();
  const { todayPercentRevenue, todayRevenue } = todayStats;
  return (
    <div className={FeaturedStyles.featured}>
      {(!todayPercentRevenue && todayPercentRevenue !== 0) ||
      (!todayRevenue && todayRevenue !== 0) ? (
        <TailSpin />
      ) : (
        <>
          <div className={FeaturedStyles.top}>
            <h1 className="title">Today Revenue</h1>
          </div>
          <div className={FeaturedStyles.bottom}>
            <div className={FeaturedStyles.featuredChart}>
              <CircularProgressbar
                value={todayPercentRevenue}
                text={`${todayPercentRevenue}%`}
                strokeWidth={5}
              />
            </div>
            <p className={FeaturedStyles.title}>Total sales made today</p>
            <p className={FeaturedStyles.amount}>&#8358;{todayRevenue}</p>
            <p className={FeaturedStyles.desc}>
              Previous transactions processing. Last payments may not be
              included.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
