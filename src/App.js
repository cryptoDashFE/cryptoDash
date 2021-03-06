import "./index.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Pricechart from "./components/Pricechart";
import { formatWeekData } from "./formatWeekData";
import { formatMonthData } from "./formatMonthData";
import { ThreeMonthformat } from "./ThreeMonthformat";
import { OneDayFormat } from "./OneDayFormat";
import { SixMonthFormat } from "./SixMonthFormat";
import DateISOConverter from "./DateISOConverter";
import { Line } from "react-chartjs-2";

function App() {
  const[time, setTime] = useState('');
  const[chartLg, setChartLg] = useState({});
  const [currencies, setcurrencies] = useState([]);
  
  //Chart 1 
  const [pair1, setpair1] = useState("LTC-USD");
  const [price1, setprice1] = useState("0.00");
  const [pastData1, setpastData1] = useState([]);

  //Chart 2
  const [pair2, setpair2] = useState("ETH-USD");
  const [price2, setprice2] = useState("0.00");
  const [pastData2, setpastData2] = useState([])
  //Chart 3
  const [pair3, setpair3] = useState("BTC-USD");
  const [price3, setprice3] = useState("0.00");
  const [pastData3, setpastData3] = useState([]);

  //so each chart can keep track of live time data
  const ws1 = useRef(null);
  const ws2 = useRef(null);
  const ws3 = useRef(null);

  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";
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

 //populate cryptocurrency options in dropdown
  useEffect(() => {
    ws1.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    ws2.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    ws3.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    let pairs = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));

      // Filter data by USD
      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
        return null;
      });

      // Filter base_currency in alphabetical order
      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      // Change currencies useState
      setcurrencies(filtered);

      // keep track of current useEffect
      first.current = true;
    };

    apiCall();
  }, []);

  //chart1
  useEffect(() => {
    // if first useEffect is false then do nothing
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair1],
      channels: ["ticker"],
    };

    let jsonMsg = JSON.stringify(msg);

    ws1.current.send(jsonMsg);

    let historicalDataURL;
    if (time === "1d") {
      historicalDataURL = `${url}/products/${pair1}/candles?granularity=3600`;
    } else if (time === "6m") {
      // Returns current ISO time
      let stop = DateISOConverter();
      // Returns 6 month past ISO time
      let start = DateISOConverter(6);
      historicalDataURL = `${url}/products/${pair1}/candles?start=${start}&stop=${stop}&granularity=86400`;
    } else {
      historicalDataURL = `${url}/products/${pair1}/candles?granularity=86400`;
    } 

    const fetchHistoricalData1 = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => {
          dataArr = data;
        });

      let formattedData;
      if (time === "1d") {
        formattedData = OneDayFormat(dataArr, 1);
      } else if (time === "1w") {
        // formatWeekData funnction parse dataArr for week
        formattedData = formatWeekData(dataArr, 1);
      } else if (time === "1m") {
        // formatMonthData function parse dataArr for 1 Month / 31 days
        formattedData = formatMonthData(dataArr, 1);
      } else if (time === "3m") {
        formattedData = ThreeMonthformat(dataArr, 1);
      } else if (time === "6m") {
        formattedData = SixMonthFormat(dataArr, 1);
      } else {
        // by default
        formattedData = formatWeekData(dataArr, 1);
      }
      setpastData1(formattedData);
    };

    fetchHistoricalData1();

    ws1.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        // console.log("NON TICKER EVENT", e);
        return;
      }

      // Update the price / real time updates
      if (data.product_id === pair1) {
        // console.log("id matches");
        setprice1(data.price);
      }
    };
  }, [time, pair1]);

  const handleSelect1 = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair1],
      channels: ["ticker"],
    };

    // When we change the option. This will unsubscribe the previous property
    let unsub = JSON.stringify(unsubMsg);
    ws1.current.send(unsub);

    setpair1(e.target.value);
  };

  //chart2
  useEffect(() => {
    // if first useEffect is false then do nothing
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair2],
      channels: ["ticker"],
    };

    let jsonMsg = JSON.stringify(msg);

    ws2.current.send(jsonMsg);

    let historicalDataURL;
    if (time === "1d") {
      historicalDataURL = `${url}/products/${pair2}/candles?granularity=3600`;
    } else if (time === "6m") {
      // Returns current ISO time
      let stop = DateISOConverter();
      // Returns 6 month past ISO time
      let start = DateISOConverter(6);

      historicalDataURL = `${url}/products/${pair2}/candles?start=${start}&stop=${stop}&granularity=86400`;
    } else {
      historicalDataURL = `${url}/products/${pair2}/candles?granularity=86400`;
    }

    // console.log(historicalDataURL);
    const fetchHistoricalData2 = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => {
          dataArr = data;
        });

      let formattedData;
      if (time === "1d") {
        formattedData = OneDayFormat(dataArr, 2);
      } else if (time === "1w") {
        // formatWeekData funnction parse dataArr for week
        formattedData = formatWeekData(dataArr, 2);
      } else if (time === "1m") {
        // formatMonthData function parse dataArr for 1 Month / 31 days
        formattedData = formatMonthData(dataArr, 2);
      } else if (time === "3m") {
        formattedData = ThreeMonthformat(dataArr, 2);
      } else if (time === "6m") {
        formattedData = SixMonthFormat(dataArr, 2);
      } else {
        // by default
        formattedData = formatWeekData(dataArr, 2);
      }
      setpastData2(formattedData);
    };

    fetchHistoricalData2();

    ws2.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        // console.log("NON TICKER EVENT", e);
        return;
      }

      // Update the price / real time updates
      if (data.product_id === pair2) {
        // console.log("id matches");
        setprice2(data.price);
      }
    };
  }, [time, pair2]);

  const handleSelect2 = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair2],
      channels: ["ticker"],
    };

    // When we change the option. This will unsubscribe the previous property
    let unsub = JSON.stringify(unsubMsg);
    ws2.current.send(unsub);

    setpair2(e.target.value);
  };

  //chart3
  useEffect(() => {
    // if first useEffect is false then do nothing
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair3],
      channels: ["ticker"],
    };

    let jsonMsg = JSON.stringify(msg);

    ws3.current.send(jsonMsg);

    let historicalDataURL;
    if (time === "1d") {
      historicalDataURL = `${url}/products/${pair3}/candles?granularity=3600`;
    } else if (time === "6m") {
      // Returns current ISO time
      let stop = DateISOConverter();
      // Returns 6 month past ISO time
      let start = DateISOConverter(6);

      historicalDataURL = `${url}/products/${pair3}/candles?start=${start}&stop=${stop}&granularity=86400`;
    } else {
      historicalDataURL = `${url}/products/${pair3}/candles?granularity=86400`;
    }

    const fetchHistoricalData3 = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => {
          dataArr = data;
        });

      let formattedData;
      if (time === "1d") {
        formattedData = OneDayFormat(dataArr, 3);
      } else if (time === "1w") {
        // formatWeekData funnction parse dataArr for week
        formattedData = formatWeekData(dataArr, 3);
      } else if (time === "1m") {
        // formatMonthData function parse dataArr for 1 Month / 31 days
        formattedData = formatMonthData(dataArr, 3);
      } else if (time === "3m") {
        formattedData = ThreeMonthformat(dataArr, 3);
      } else if (time === "6m") {
        formattedData = SixMonthFormat(dataArr, 3);
      } else {
        // by default
        formattedData = formatWeekData(dataArr, 3);
      }
      setpastData3(formattedData);
    };

    fetchHistoricalData3();

    ws3.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        // console.log("NON TICKER EVENT", e);
        return;
      }

      // Update the price / real time updates
      if (data.product_id === pair3) {
        // console.log("id matches");
        setprice3(data.price);
      }
    };
  }, [time, pair3]);

  const handleSelect3 = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair3],
      channels: ["ticker"],
    };

    // When we change the option. This will unsubscribe the previous property
    let unsub = JSON.stringify(unsubMsg);
    ws3.current.send(unsub);

    setpair3(e.target.value);
  };

  useEffect(() => {
    let array1 = [];
    let array2 = [];
    let array3 = [];
    if(typeof pastData1.datasets !== 'undefined')
      {array1 = pastData1.datasets[0].data;}
    if(typeof pastData2.datasets !== 'undefined')
      {array2 = pastData2.datasets[0].data;}
    if(typeof pastData3.datasets !== 'undefined')
      {array3 = pastData3.datasets[0].data;}
    let finalData = {
      labels: pastData1.labels,
      datasets: [
      {
        label: pair1 + " Price",
        data: array1,
        backgroundColor: "rgb(57, 255, 20)",
        borderColor: "rgba(57, 255, 20, 0.2)",
        fill: false,
      },
      {
        label: pair2 + " Price",
        data: array2,
        backgroundColor: "rgb(255, 163, 67)",
        borderColor: "rgba(255, 163, 67, 0.2)",
        fill: false,
      },
      {
        label: pair3 + " Price",
        data: array3,
        backgroundColor: "rgb(254, 65, 100)",
        borderColor:  "rgba(254, 65, 100, 0.2)",
        fill: false,
      }]
      };
      setChartLg(finalData);
  }, [pastData1, pastData2, pastData3, pair1, pair2, pair3]);

  return (
    <section className="grid-container mainChart">
      <div className="grid-item logo">
        <img src="logo.png" alt="Logo" height="50px" width="50px"></img>
      </div>
      <div id="lgChart" className="grid-item lgChart">
        <Line data={chartLg} options={opts} />
      </div>
      <div className="grid-item timeFrames">
        <div className="buttons">
        <button onClick={(e) => setTime('1d')} type="button" className="btn btn-primary">1D</button>
        <button onClick={(e) => setTime('1w')} type="button" className="btn btn-primary">1W</button>
        <button onClick={(e) => setTime('1m')} type="button" className="btn btn-primary">1M</button>
        <button onClick={(e) => setTime('3m')} type="button" className="btn btn-primary">3M</button>
        <button onClick={(e) => setTime('6m')} type="button" className="btn btn-primary">6M</button>
        </div>
      </div>
      <div id="smChart1" className="grid-item smChart1">
        <Pricechart price={price1} data={pastData1} />
        <select name="currency" value={pair1} onChange={handleSelect1}>
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
      </div>
      <div id="smChart2" className="grid-item smChart2">
        <Pricechart price={price2} data={pastData2} />
        <select name="currency" value={pair2} onChange={handleSelect2}>
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
      </div>
      <div id="smChart3" className="grid-item smChart3">
        <Pricechart price={price3} data={pastData3} />
        <select name="currency" value={pair3} onChange={handleSelect3}>
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
}

export default App;
