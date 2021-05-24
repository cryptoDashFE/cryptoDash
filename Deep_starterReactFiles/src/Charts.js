import React from "react";
import { useState, useEffect, useRef } from "react";
import { formatData } from "./utils";
import { formatWeekData } from "./WeekFormat";
import { formatMonthData } from "./Monthformat";
import Pricechart from "./components/Pricechart";
import "./index.css";

function Charts() {
  const [currencies, setcurrencies] = useState([]);
  const [pair, setpair] = useState("");
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const ws = useRef(null);
  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

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
        return;
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

  useEffect(() => {
    // if first useEffect is false then do nothing
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };

    let jsonMsg = JSON.stringify(msg);

    ws.current.send(jsonMsg);

    // let historicalDataURL = `${url}/products/${pair}/candles?start=2020-05-22T12:00:00&stop=2021-05-22T12:00:00&granularity=86400`;

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;

    // console.log(historicalDataURL);
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      /*************** TODO : Need some loging to call the correct function.  **************/

      // formatWeekData funnction parse dataArr for week
      // let formattedData = formatWeekData(dataArr);

      // formatMonthData function parse dataArr for 1 Month / 31 days
      let formattedData = formatMonthData(dataArr);

      setpastData(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        // console.log("NON TICKER EVENT", e);
        return;
      }

      // Update the price / real time updates
      if (data.product_id === pair) {
        let twoDec = (Math.round(data.price * 100) / 100).toFixed(2);
        setprice(twoDec);
      }
    };
  }, [pair]);

  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };

    // When we change the option. This will unsubscribe the previous property
    let unsub = JSON.stringify(unsubMsg);
    ws.current.send(unsub);

    setpair(e.target.value);
  };

  return (
    <div>
      <p>ChartOne</p>
      {
        <select name="currency" value={pair} onChange={handleSelect}>
          {currencies.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
      }

      <Pricechart price={price} data={pastData} />
    </div>
  );
}

export default Charts;
