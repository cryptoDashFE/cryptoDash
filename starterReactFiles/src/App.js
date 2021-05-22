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

function App() {
  const[time, setTime] = React.useState();

  const [loading1, setLoading1] = React.useState(true);
  const [items1, setItems1] = React.useState([]);
  const [value1, setValue1] = React.useState();
  const [chart1, setChart1] = React.useState(genData());

  const [loading2, setLoading2] = React.useState(true);
  const [items2, setItems2] = React.useState([]);
  const [value2, setValue2] = React.useState();
  const [chart2, setChart2] = React.useState(genData());

  const [loading3, setLoading3] = React.useState(true);
  const [items3, setItems3] = React.useState([]);
  const [value3, setValue3] = React.useState();
  const [chart3, setChart3] = React.useState(genData());

  React.useEffect(() => {
    let unmounted = false;
    async function getCurrencies() {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all"
      );
      const body = await response.json();
      if (!unmounted) {
        setItems1(
          body.map(({ name }) => ({ label: name, value: name }))
        );
        setLoading1(false);
      }
    }
    getCurrencies();
    setChart1(genData());
    return () => {
      unmounted = true;
    };
  }, []);

  React.useEffect(() => {
    let unmounted = false;
    async function getCurrencies() {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all"
      );
      const body = await response.json();
      if (!unmounted) {
        setItems2(
          body.map(({ name }) => ({ label: name, value: name }))
        );
        setLoading2(false);
      }
    }
    getCurrencies();
    setChart2(genData());
    return () => {
      unmounted = true;
    };
  }, []);

  React.useEffect(() => {
    let unmounted = false;
    async function getCurrencies() {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all"
      );
      const body = await response.json();
      if (!unmounted) {
        setItems3(
          body.map(({ name }) => ({ label: name, value: name }))
        );
        setLoading3(false);
      }
    }
    getCurrencies();
    setChart3(genData());
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <section class="grid-container mainChart">
      <div class="grid-item logo">Logo</div>
      <div id="lgChart" class="grid-item lgChart"><p>{time}</p></div>
      <div class="grid-item timeFrames">
        <button onClick={(e) => setTime(e.target.value)} type="button" class="btn btn-secondary" value="1D">1D</button>
        <button onClick={(e) => setTime(e.target.value)} type="button" class="btn btn-secondary" value="1W">1W</button>
        <button onClick={(e) => setTime(e.target.value)} type="button" class="btn btn-secondary" value="1M">1M</button>
        <button onClick={(e) => setTime(e.target.value)} type="button" class="btn btn-secondary" value="3M">3M</button>
        <button onClick={(e) => setTime(e.target.value)} type="button" class="btn btn-secondary" value="6M">6M</button>
        <button onClick={(e) => setTime(e.target.value)} type="button" class="btn btn-secondary" value="1Y">1Y</button>
      </div>
      <div class="grid-item options">
        <button type="button" class="btn btn-primary">MarketCap</button>
        <button type="button" class="btn btn-primary">Price</button>
        <button type="button" class="btn btn-primary">Overlay</button>
        <button type="button" class="btn btn-primary">Volume</button>
      </div>
        <div id="smChart1" class="grid-item smChart1">
          <p>{value1}</p>
          <Line data={chart1} options={options} />
          <select
            disabled={loading1}
            value={value1}
            onChange={(e) => 
            setValue1(e.currentTarget.value)}>
            {items1.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
          ))}
          </select>
        </div>
        <div id="smChart2" class="grid-item smChart2">
          <p>{value2}</p>
          <Line data={chart2} options={options} />
          <select
            disabled={loading2}
            value={value2}
            onChange={(e) => 
            setValue2(e.currentTarget.value)}>
          {items2.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
          ))}
          </select>
        </div>
      <div id="smChart3" class="grid-item smChart3">
        <p>{value3}</p>
        <Line data={chart3} options={options} />
        <select
          disabled={loading3}
          value={value3}
          onChange={(e) => 
            setValue3(e.currentTarget.value)}>
          {items3.map(({ label, value }) => (
            <option key={value} value={value3}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default App;