export const formatData = (data, chartNum) => {
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
}
else if (chartNum === 2) {
  finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
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
        backgroundColor: 'rgb(153, 102, 255)',
        borderColor:  'rgba(153, 102, 255, 0.2)',
        fill: false,
      },
    ],
  };
}   

  let dates = data.map((val) => {
    const ts = val[0];
    // console.log("ts:", ts);
    let date = new Date(ts * 1000);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let final = `${month}-${day}-${year}`;
    return final;
  });

  let priceArr = data.map((val) => {
    return val[4];
  });

  priceArr.reverse();
  dates.reverse();
  finalData.labels = dates;
  finalData.datasets[0].data = priceArr;

  //   console.log("final data", finalData);
  return finalData;
};
