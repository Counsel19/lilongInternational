import LChartStyles from "../../../styles/admin/charts/LineChart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useAppContext } from "../../../context/AppContext";

const Chart = ({ aspect }) => {
  const { monthlyRevSales } = useAppContext();


  return (
    <div className={LChartStyles.chart}>
      <div className={LChartStyles.title}>Business Overview</div>
      <ResponsiveContainer width="99%" aspect={aspect}>
        <AreaChart
          width={300}
          height={350}
          data={monthlyRevSales}
          margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
        >
          <defs>
            <linearGradient id="numOfSales" x1="1" y1="1" x2="1" y2="2">
              <stop offset="5%" stopColor="#17b42a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#17b42a" stopOpacity={0} />
            </linearGradient>
            <linearGradient
              name="Total Revenue"
              id="revenueAmt"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#1352b9" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1352b9" stopOpacity={0} />
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
            name="Total Sales"
            dataKey="numOfSales"
            stroke="#17b42a"
            fillOpacity={1}
            fill="url(#numOfSales)"
          />
          <Area
            type="monotone"
            name="Total Revenue"
            dataKey="revenueAmt"
            stroke="#1352b9"
            fillOpacity={1}
            fill="url(#revenueAmt)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
