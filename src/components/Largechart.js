// Format options and data geathering for the large chart
import React from "react";
import { Line } from "react-chartjs-2";

function Largechart({ price, data1, data2, data3 }) {
  // TODO : Combine data of all three sub charts and pass it to Line component

  // let allChartsData = {
  //   labels: data1.labels,
  //   datasets: [
  //     data1.datasets[0].data,
  //     data2.datasets[0].data,
  //     data3.datasets[0].data,
  //   ],
  // };

  const opts = {
    animation: {
      durations: 0,
    },
    tooltips: {
      intersect: false,
      mode: "index",
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    // <>
    //   <h2>
    //     {dataFirst.label} {dataSecond.label} {dataThird.label}
    //   </h2>
    //   <div class="dashboard">
    //     <div className="chart-container">
    //       <Line data={allChartsData} options={chartOptions} />
    //     </div>
    //   </div>
    // </>

    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-container">
        <Line data={data1} options={opts} />
      </div>
    </div>
  );
}

export default Largechart;
