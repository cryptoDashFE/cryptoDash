import { Line } from "react-chartjs-2";

function Dashboard({ price, data }) {
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
  if (price === "0.00") {
    return <h3>PLEASE SELECT A CURRENCY PAIR</h3>;
  }
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-container">
        <Line data={data} options={opts} />
      </div>
    </div>
  );
}

export default Dashboard;
