
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import '../css/cryptochart.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const { Title } = Typography;

// passed props from CryptoDetails component
const CryptoChart = ({coinHistory, currentPrice, coinName}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // the history is hourly time stamps
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.unshift(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.unshift(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString('en-US'));
  }

 
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: true,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      //this option will disable the display of values on the chart itself as 'ChartDataLabels' component is registered globally, and the global function to disable isn't working
      //Chart.defaults.global.plugins.datalabels.display = false;
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
  
};

export default CryptoChart;
