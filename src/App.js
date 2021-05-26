import './index.css';
import React from "react";
import { useState, useEffect, useRef } from "react";
import Pricechart from "./components/Pricechart";
import { formatWeekData } from "./WeekFormat";
import { formatMonthData } from "./Monthformat";
import { formatData } from './utils.js';

function App() {
  const[time, setTime] = useState('');
 // const[chartLg, setChartLg] = useState([]);
  const [currencies, setcurrencies] = useState([]);
  
  //Chart 1 
  const [pair1, setpair1] = useState("BTC-USD");
  const [price1, setprice1] = useState("0.00");
  const [pastData1, setpastData1] = useState({});

  //Chart 2
  const [pair2, setpair2] = useState("BTC-USD");
  const [price2, setprice2] = useState("0.00");
  const [pastData2, setpastData2] = useState({});

  //Chart 3
  const [pair3, setpair3] = useState("BTC-USD");
  const [price3, setprice3] = useState("0.00");
  const [pastData3, setpastData3] = useState({});
  
  //so each chart can keep track of live time data
  const ws1 = useRef(null);
  const ws2 = useRef(null);
  const ws3 = useRef(null);

  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

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

    ws1.current.send(jsonMsg);

    // let historicalDataURL = `${url}/products/${pair}/candles?start=2020-05-22T12:00:00&stop=2021-05-22T12:00:00&granularity=86400`;

    let historicalDataURL = `${url}/products/${pair1}/candles?granularity=86400`;

    // console.log(historicalDataURL);
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      /*************** TODO : Implement all timeframe functions.  ******************/
      // Replace formatData function with the function for that specific timeframe.
      let formattedData;
      if(time === '1d') 
        formattedData= formatData(dataArr, 1);
      else if(time === '1w')
        // formatWeekData funnction parse dataArr for week
        formattedData = formatWeekData(dataArr, 1);
      else if(time === '1m')
        // formatMonthData function parse dataArr for 1 Month / 31 days
        formattedData = formatMonthData(dataArr, 1);
      else if(time === '3m')
        formattedData = formatData(dataArr, 1);
      else if(time === '6m')
        formattedData = formatData(dataArr, 1);
      else if(time === '1y')
        formattedData = formatData(dataArr, 1);
      else 
        formattedData = formatData(dataArr, 1);
      setpastData1(formattedData);
    };

    fetchHistoricalData();

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

  // let historicalDataURL = `${url}/products/${pair}/candles?start=2020-05-22T12:00:00&stop=2021-05-22T12:00:00&granularity=86400`;

  let historicalDataURL = `${url}/products/${pair2}/candles?granularity=86400`;

  // console.log(historicalDataURL);
  const fetchHistoricalData = async () => {
    let dataArr = [];
    await fetch(historicalDataURL)
      .then((res) => res.json())
      .then((data) => (dataArr = data));

      /*************** TODO : Implement all timeframe functions.  ******************/
      // Replace formatData function with the function for that specific timeframe.
      let formattedData;
      if(time === '1d') 
        formattedData= formatData(dataArr, 2);
      else if(time === '1w')
        // formatWeekData funnction parse dataArr for week
        formattedData = formatWeekData(dataArr, 2);
      else if(time === '1m')
        // formatMonthData function parse dataArr for 1 Month / 31 days
        formattedData = formatMonthData(dataArr, 2);
      else if(time === '3m')
        formattedData = formatData(dataArr, 2);
      else if(time === '6m')
        formattedData = formatData(dataArr, 2);
      else if(time === '1y')
        formattedData = formatData(dataArr, 2);
      else 
        formattedData = formatData(dataArr, 2);
    setpastData2(formattedData);
  };

  fetchHistoricalData();

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

  // let historicalDataURL = `${url}/products/${pair}/candles?start=2020-05-22T12:00:00&stop=2021-05-22T12:00:00&granularity=86400`;

  let historicalDataURL = `${url}/products/${pair3}/candles?granularity=86400`;

  // console.log(historicalDataURL);
  const fetchHistoricalData = async () => {
    let dataArr = [];
    await fetch(historicalDataURL)
      .then((res) => res.json())
      .then((data) => (dataArr = data));

          /*************** TODO : Implement all timeframe functions.  ******************/
          // Replace formatData function with the function for that specific timeframe.
          let formattedData;
          if(time === '1d') 
            formattedData= formatData(dataArr, 3);
          else if(time === '1w')
            // formatWeekData funnction parse dataArr for week
            formattedData = formatWeekData(dataArr, 3);
          else if(time === '1m')
            // formatMonthData function parse dataArr for 1 Month / 31 days
            formattedData = formatMonthData(dataArr, 3);
          else if(time === '3m')
            formattedData = formatData(dataArr, 3);
          else if(time === '6m')
            formattedData = formatData(dataArr, 3);
          else if(time === '1y')
            formattedData = formatData(dataArr, 3);
          else 
            formattedData = formatData(dataArr, 3);
    setpastData3(formattedData);
  };

  fetchHistoricalData();

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


  return (
    <section className="grid-container mainChart">
      <div className="grid-item logo">Logo</div>
      <div id="lgChart" className="grid-item lgChart">
        <p>Large</p> 
      </div>
      <div className="grid-item timeFrames">
        <button onClick={(e) => setTime('1d')} type="button" className="btn btn-secondary">1D</button>
        <button onClick={(e) => setTime('1w')} type="button" className="btn btn-secondary">1W</button>
        <button onClick={(e) => setTime('1m')} type="button" className="btn btn-secondary">1M</button>
        <button onClick={(e) => setTime('3m')} type="button" className="btn btn-secondary">3M</button>
        <button onClick={(e) => setTime('6m')} type="button" className="btn btn-secondary">6M</button>
        <button onClick={(e) => setTime('1y')} type="button" className="btn btn-secondary">1Y</button>
      </div>
      <div className="grid-item options">
        <button type="button" className="btn btn-primary">MarketCap</button>
        <button type="button" className="btn btn-primary">Price</button>
        <button type="button" className="btn btn-primary">Overlay</button>
        <button type="button" className="btn btn-primary">Volume</button>
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