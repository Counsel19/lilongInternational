import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { TailSpin } from "react-loader-spinner";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnoutChart({ data, bestSeller }) {

  const data1 = {
    labels: data?.map((item) => item.state || `${item.name}(${item.count})`).splice(0, 3),
    datasets: [
      {
        data: data?.map((item) => item.count).splice(0, 3),
        backgroundColor: ["#7e88ef", "#3fb757", "#7bcaec", "#F7A76C"],
        hoverBackgroundColor: ["#7e88ef", "#3fb757", "#7bcaec", "#F7A79f"],
      },
    ],
  };

  return (
    <div className="flex-1 bg-white h-full p-6" style={{ height: "59vh" }}>
      <div className="mb-4 font-semibold text-lg text-gray-500">
        {bestSeller ? "Best Selling Product" : "Order Status Summary"}
      </div>
      {data ? (
        <div className=" h-full">
          <Doughnut
            options={{
              legend: {
                display: true,
                position: "bottom",
              },
            }}
            data={data1}
            width={80}
            height={80}
          />
        </div>
      ) : (
       <TailSpin />
      )}
    </div>
  );
}

export default DoughnoutChart;
