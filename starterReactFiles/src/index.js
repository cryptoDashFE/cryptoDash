import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SmChartOne from './SmChart';
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
