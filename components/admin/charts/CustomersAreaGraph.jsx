import LChartStyles from "../../../styles/admin/charts/LineChart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useAppContext } from "../../../context/AppContext";

import { TailSpin } from "react-loader-spinner";

const CustomersAreaGraph = ({ aspect }) => {


  const { purchaseAffiliateMonthlyRep:data } = useAppContext();
  return (
    
    <div className={LChartStyles.chart}>
      <div className={LChartStyles.title}>Orders Vs Affiliate </div>
      {
        data ? (
          <ResponsiveContainer width="99%" aspect={aspect}>
        <AreaChart
          width={300}
          height={350}
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
        >
          {/* #0b64da
        #1352b9 */}
          <defs>
            <linearGradient id="totalAffiliate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1352b9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1352b9" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="totalPurchase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#17b42a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#17b42a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="gray" />
          <CartesianGrid
            strokeDasharray="3 3"
            className={LChartStyles.chartGrid}
          />
          <Tooltip />

          <Legend />
          <Area
            type="monotone"
            name="Total Affiliates"
            dataKey="totalAffiliate"
            stroke="#1352b9"
            fillOpacity={1}
            fill="url(#totalPurchase)"
          />
          <Area
            type="monotone"
            name="Total Purchases"
            dataKey="totalPurchase"
            stroke="#17b42a"
            fillOpacity={1}
            fill="url(#totalPurchase)"
          />
        </AreaChart>
      </ResponsiveContainer>
        ): (
          <TailSpin />
        )
      }
    </div>
  );
};

export default CustomersAreaGraph;
