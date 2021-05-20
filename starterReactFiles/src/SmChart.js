import React from "react";
import './index.css';
import { Line } from 'react-chartjs-2';

const getLabels = (currency) => {
  return ['1', '2', '3', '4', '5', '6'];
}
const getData = (currency) => {
  return ['1', '2', '3', '4', '5', '6'];
}

const genData = () => (
  {
  labels: getLabels(),
  datasets: [
    {
      label: 'Price',
      data: getData(),
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function SmChart() {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState();
  const [chart, setChart] = React.useState(genData());

  React.useEffect(() => {
    let unmounted = false;
    async function getCurrencies() {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all"
      );
      const body = await response.json();
      if (!unmounted) {
        setItems(
          body.map(({ name }) => ({ label: name, value: name }))
        );
        setLoading(false);
      }
    }
    getCurrencies();
    setChart(genData());
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div>
      <p>{value}</p>
      <Line data={chart} options={options} />
    <select
      disabled={loading}
      value={value}
      onChange={(e) => 
        setValue(e.currentTarget.value)}
    >
      {items.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    </div>
  );
}

export default SmChart;