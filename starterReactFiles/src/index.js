import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SmChartOne from './SmChart';
import LgChart from './LgChart';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <SmChartOne />
  </React.StrictMode>,
  document.getElementById('smChart1')
);

ReactDOM.render(
  <React.StrictMode>
    <SmChartOne />
  </React.StrictMode>,
  document.getElementById('smChart2')
);

ReactDOM.render(
  <React.StrictMode>
    <SmChartOne />
  </React.StrictMode>,
  document.getElementById('smChart3')
);

ReactDOM.render(
  <React.StrictMode>
    <LgChart />
  </React.StrictMode>,
  document.getElementById('lgChart')
);

