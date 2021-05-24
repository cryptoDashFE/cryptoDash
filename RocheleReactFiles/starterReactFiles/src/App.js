import React from "react";
import './index.css';
import { Line } from 'react-chartjs-2';

const options = {
  animation: {
    duration: 0
  },
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
  const[time, setTime] = React.useState([]);

  const [items1, setItems1] = React.useState([]);
  const [value1, setValue1] = React.useState();
  const [chart1, setChart1] = React.useState();
  const [chartData1, setChartData1] = React.useState([]);
  
  const [items2, setItems2] = React.useState([]);
  const [value2, setValue2] = React.useState();
  const [chart2, setChart2] = React.useState();
  const [chartData2, setChartData2] = React.useState([]);

  const [items3, setItems3] = React.useState([]);
  const [value3, setValue3] = React.useState();
  const [chart3, setChart3] = React.useState();
  const [chartData3, setChartData3] = React.useState([]);

  async function getData(curr) {
    let name;
    if(curr)
      name = curr;
    else name = 'Aruba';
    const url = 'https://restcountries.eu/rest/v2/name/' + name;
    //'https://rest.coinapi.io/v1/exchanges';
    const response = await fetch(url, 
    {
      method: "GET",
      //headers: {'X-CoinAPI-Key': 'YOUR-KEY-HERE'}
    });
    const body = await response.json();
    return [body[0].population, body[0].population, body[0].population, body[0].population, body[0].population, body[0].population];
    }

  const fetchData1 = React.useCallback(async () => {
    const newData = await getData(value1);
    setChartData1(newData);
  }, [value1]);

  React.useEffect(() => {
    fetchData1();
  }, [fetchData1]);

  React.useEffect(() => { 
  const updateChart = () => (
    {
    labels: time,
    datasets: [
      {
        label: 'Price',
        data: chartData1,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  });
  setChart1(updateChart());
}, [time, chartData1]);
  
  React.useEffect(() => {
    let unmounted = false;
    async function getCurrencies() {
      const url = 'https://restcountries.eu/rest/v2/all';
      //'https://rest.coinapi.io/v1/exchanges';
      const response = await fetch(url, 
      {
        method: "GET",
        //headers: {'X-CoinAPI-Key': 'YOUR-KEY-HERE'}
      });
      const body = await response.json();
      if (!unmounted) {
        setItems1(
          body.map(({ name }) => ({ label: name, value: name }))
        );
      }
    }
    getCurrencies();
    return () => {
      unmounted = true;
    };
  }, []);

  const fetchData2 = React.useCallback(async () => {
    const newData = await getData(value2);
    setChartData2(newData);
  }, [value2]);

  React.useEffect(() => {
    fetchData2();
  }, [fetchData2]);

  React.useEffect(() => { 
  const updateChart = () => (
    {
    labels: time,
    datasets: [
      {
        label: 'Price',
        data: chartData2,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  });
  setChart2(updateChart());
}, [time, chartData2]);

  React.useEffect(() => {
    let unmounted = false;
    async function getCurrencies() {
      const url = 'https://restcountries.eu/rest/v2/all';
      //"https://rest.coinapi.io/v1/exchanges";
      const response = await fetch(url, 
      {
        method: "GET",
        //headers: {'X-CoinAPI-Key': 'YOUR KEY HERE'}
      });
      const body = await response.json();
      if (!unmounted) {
        setItems2(
          body.map(({ name }) => ({ label: name, value: name }))
        );
      }
    }
    getCurrencies();
    return () => {
      unmounted = true;
    };
  }, []);

  const fetchData3 = React.useCallback(async () => {
    const newData = await getData(value3);
    setChartData3(newData);
  }, [value3]);

  React.useEffect(() => {
    fetchData3();
  }, [fetchData3]);

  React.useEffect(() => { 
  const updateChart = () => (
    {
    labels: time,
    datasets: [
      {
        label: 'Price',
        data: chartData3,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  });
  setChart3(updateChart());
}, [time, chartData3]);

  React.useEffect(() => {
    let unmounted = false;
    async function getCurrencies() {
      const url = 'https://restcountries.eu/rest/v2/all';
      //"https://rest.coinapi.io/v1/exchanges";
      const response = await fetch(url, 
      {
        method: "GET",
        //headers: {'X-CoinAPI-Key': 'YOUR-KEY-HERE'}
      });
      const body = await response.json();
      if (!unmounted) {
        setItems3(
          body.map(({ name }) => ({ label: name, value: name }))
        );
      }
    }
    getCurrencies();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <section className="grid-container mainChart">
      <div className="grid-item logo">Logo</div>
      <div id="lgChart" className="grid-item lgChart"><p>{time}</p></div>
      <div className="grid-item timeFrames">
        <button onClick={(e) => setTime(['d', 'd', 'd', 'd', 'd', 'd'])} type="button" className="btn btn-secondary">1D</button>
        <button onClick={(e) => setTime(['w', 'w', 'w', 'w', 'w', 'w'])} type="button" className="btn btn-secondary">1W</button>
        <button onClick={(e) => setTime([1, 1, 1, 1, 1, 1])} type="button" className="btn btn-secondary">1M</button>
        <button onClick={(e) => setTime([3, 3, 3, 3, 3, 3])} type="button" className="btn btn-secondary">3M</button>
        <button onClick={(e) => setTime([6, 6, 6, 6, 6, 6])} type="button" className="btn btn-secondary">6M</button>
        <button onClick={(e) => setTime(['y', 'y', 'y', 'y', 'y', 'y'])} type="button" className="btn btn-secondary">1Y</button>
      </div>
      <div className="grid-item options">
        <button type="button" className="btn btn-primary">MarketCap</button>
        <button type="button" className="btn btn-primary">Price</button>
        <button type="button" className="btn btn-primary">Overlay</button>
        <button type="button" className="btn btn-primary">Volume</button>
      </div>
        <div id="smChart1" className="grid-item smChart1">
          <p>{value1}</p>
          <Line data={chart1} options={options} />
          <select
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
        <div id="smChart2" className="grid-item smChart2">
          <p>{value2}</p>
          <Line data={chart2} options={options} />
          <select
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
      <div id="smChart3" className="grid-item smChart3">
        <p>{value3}</p>
        <Line data={chart3} options={options} />
        <select
          value={value3}
          onChange={(e) => 
            setValue3(e.currentTarget.value)}>
          {items3.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default App;