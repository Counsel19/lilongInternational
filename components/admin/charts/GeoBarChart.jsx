import { useEffect, useState } from "react";
import ChartStyles from "../../../styles/admin/charts/LineChart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from "../../../context/AppContext";
import { TailSpin } from "react-loader-spinner";

const GeoBarChart = () => {
  const [data, setData] = useState([]);
  const { usersByLocation, user } = useAppContext();

  useEffect(() => {
    setData(
      usersByLocation?.map((item) => ({
        count: item.count,
        location: `${item.state}, ${item.country}`,
      })).sort((a, b) => b.count - a.count)
    );
  }, [usersByLocation, user]);

  return (
    <div className={ChartStyles.chart}>
      <div className={ChartStyles.title}>Revenue by Location </div>
      {data ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={150}
            height={40}
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
          >
            <Bar dataKey="count" fill="#8884d8" />
            <XAxis dataKey="location" stroke="#2f8fe4" />

            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default GeoBarChart;
