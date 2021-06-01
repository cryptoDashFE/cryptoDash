// Format one week data
export const ThreeMonthformat = (data, chartNum) => {
  let finalData;
  if (chartNum === 1) {
    finalData = {
      labels: [],
      datasets: [
        {
          label: "Price",
          data: [],
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
        },
      ],
    };
  } else if (chartNum === 2) {
    finalData = {
      labels: [],
      datasets: [
        {
          label: "Price",
          data: [],
          backgroundColor: "rgb(75, 192, 192)",
          borderColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
        },
      ],
    };
  } else {
    finalData = {
      labels: [],
      datasets: [
        {
          label: "Price",
          data: [],
          backgroundColor: "rgb(153, 102, 255)",
          borderColor: "rgba(153, 102, 255, 0.2)",
          fill: false,
        },
      ],
    };
  }

  data = Array.from(data);
  let dates = data.map((val) => {
    // [0, 1, 2, 3, 4, 5]
    // [ time, low, high, open, close, volume ],
    // [ 1415398768, 0.32, 4.2, 0.35, 4.2, 12.3 ]
    // Here time is in unix timestamp
    // Convert time from unix to current date.
    const ts = val[0];
    let date = new Date(ts * 1000);
    let day = date.getDate() + 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let final = `${month}-${day}-${year}`;

    return final;
  });

  // Process all the data
  let priceArr = data.map((val) => {
    return val[4];
  });

  // Only keep prices of 90 days range with 10 days interval
  let weekDates = [];
  let threemonthArr = [];
  let intervalTime = 10;
  if (priceArr.length >= 90) {
    for (let i = 0, j = 0; i < 90; i = i + 10, j++) {
      weekDates[j] = dates[i];
      threemonthArr[j] = priceArr[i].toFixed(2);
      intervalTime--;
      if (intervalTime === 0) {
        intervalTime = 10;
      }
    }
  }

  threemonthArr.reverse();
  weekDates.reverse();
  finalData.labels = weekDates;
  finalData.datasets[0].data = threemonthArr;
  return finalData;
};
