import './index.css';
import React from "react";
import { useState, useEffect, useRef } from "react";
import { formatData } from "./utils";
import Dashboard from "./components/Dashboard";

function App() {
  const[time, setTime] = useState([]);
 // const[chartLg, setChartLg] = useState([]);

  const [currencies, setcurrencies] = useState([]);
  const [pair1, setpair1] = useState("");
  const [price1, setprice1] = useState("0.00");
  const [pastData1, setpastData1] = useState({});

  const [pair2, setpair2] = useState("");
  const [price2, setprice2] = useState("0.00");
  const [pastData2, setpastData2] = useState({});

  const [pair3, setpair3] = useState("");
  const [price3, setprice3] = useState("0.00");
  const [pastData3, setpastData3] = useState({});
  
  const ws = useRef(null);
  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

//populate cryptocurrency options in dropdown  
useEffect(() => {
  ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
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

    // Testing
    console.log("filtered: ", filtered);

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

    ws.current.send(jsonMsg);

    // let historicalDataURL = `${url}/products/${pair}/candles?start=2020-05-22T12:00:00&stop=2021-05-22T12:00:00&granularity=86400`;

    let historicalDataURL = `${url}/products/${pair1}/candles?granularity=86400`;

    // console.log(historicalDataURL);
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      console.log(dataArr);
      let formattedData = formatData(dataArr, 1);
      console.log("formated:", dataArr);
      setpastData1(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
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
  }, [pair1]);

  const handleSelect1 = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair1],
      channels: ["ticker"],
    };

    // When we change the option. This will unsubscribe the previous property
    let unsub = JSON.stringify(unsubMsg);
    ws.current.send(unsub);

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

  ws.current.send(jsonMsg);

  // let historicalDataURL = `${url}/products/${pair}/candles?start=2020-05-22T12:00:00&stop=2021-05-22T12:00:00&granularity=86400`;

  let historicalDataURL = `${url}/products/${pair2}/candles?granularity=86400`;

  // console.log(historicalDataURL);
  const fetchHistoricalData = async () => {
    let dataArr = [];
    await fetch(historicalDataURL)
      .then((res) => res.json())
      .then((data) => (dataArr = data));

    console.log(dataArr);
    let formattedData = formatData(dataArr, 2);
    console.log("formated:", dataArr);
    setpastData2(formattedData);
  };

  fetchHistoricalData();

  ws.current.onmessage = (e) => {
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
}, [pair2]);

const handleSelect2 = (e) => {
  let unsubMsg = {
    type: "unsubscribe",
    product_ids: [pair2],
    channels: ["ticker"],
  };

  // When we change the option. This will unsubscribe the previous property
  let unsub = JSON.stringify(unsubMsg);
  ws.current.send(unsub);

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

  ws.current.send(jsonMsg);

  // let historicalDataURL = `${url}/products/${pair}/candles?start=2020-05-22T12:00:00&stop=2021-05-22T12:00:00&granularity=86400`;

  let historicalDataURL = `${url}/products/${pair3}/candles?granularity=86400`;

  // console.log(historicalDataURL);
  const fetchHistoricalData = async () => {
    let dataArr = [];
    await fetch(historicalDataURL)
      .then((res) => res.json())
      .then((data) => (dataArr = data));

    console.log(dataArr);
    let formattedData = formatData(dataArr, 3);
    console.log("formated:", dataArr);
    setpastData3(formattedData);
  };

  fetchHistoricalData();

  ws.current.onmessage = (e) => {
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
}, [pair3]);

const handleSelect3 = (e) => {
  let unsubMsg = {
    type: "unsubscribe",
    product_ids: [pair3],
    channels: ["ticker"],
  };

  // When we change the option. This will unsubscribe the previous property
  let unsub = JSON.stringify(unsubMsg);
  ws.current.send(unsub);

  setpair3(e.target.value);
};


  return (
    <section className="grid-container mainChart">
      <div className="grid-item logo">Logo</div>
      <div id="lgChart" className="grid-item lgChart">
        <p>Large</p> 
      </div>
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
        <Dashboard price={price1} data={pastData1} />
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
        <Dashboard price={price2} data={pastData2} />
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
      <Dashboard price={price3} data={pastData3} />
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