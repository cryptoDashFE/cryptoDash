import { Line } from "react-chartjs-2";

function Pricechart({ price, data }) {
  const opts = {
    animation: {
      duration: 0
    },
    tooltips: {
      intersect: false,
      mode: "index",
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-item">
        <Line data={data} options={opts} />
      </div>
    </div>
  );
}

export default Pricechart;
