// Format one week data
export const formatWeekData = (data, chartNum) => {
  let finalData;
  if (chartNum === 1) {
  finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgb(57, 255, 20)",
        borderColor: "rgba(57, 255, 20, 0.2)",
        fill: false,
      },
    ],
  };
}
else if (chartNum === 2) {
  finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgb(255, 163, 67)",
        borderColor: "rgba(255, 163, 67, 0.2)",
        fill: false,
      },
    ],
  };
}
else {
  finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgb(254, 65, 100)",
        borderColor:  "rgba(254, 65, 100, 0.2)",
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
  // const priceArr = "";
  let priceArr = data.map((val) => {
    return val[4];
  });

  // Only keep a week dates
  let weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates[i] = dates[i];
  }

  // Only keep prices of seven days
  const sevArr = [];
  if (priceArr.length >= 7) {
    for (let i = 0; i < 7; i++) {
      sevArr[i] = priceArr[i].toFixed(2);
    }
  }

  sevArr.reverse();
  weekDates.reverse();
  finalData.labels = weekDates;
  finalData.datasets[0].data = sevArr;
  return finalData;
};
