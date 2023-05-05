import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-chartjs-2";
import Spinner from "./Spins";
import OwnedChart from "./OwnedChart";
import { useGetCryptosQuery } from "../services/cryptoApi";
import {
  useGetCryptoHistoryQuery,
  useGetCryptoHistory2Query,
} from "../services/cryptoApi";

import { Table, Col, Row, Container, Card } from "react-bootstrap"
import "../css/homechart.css";

import {
  Chart as ChartJS,
  registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomeChart = () => {
  const coinId = "Qwsogvtv82FCd";
  const coin2Id = "razxDUgYGNAdQ";
  const timeperiod = "30d";
  const timeperiod2 = "30d";
  const fearIndexValue = [];
  const fearIndexDates = [];
  const btcPrices = [];
  const ethPrices = [];

  const count = 10;
  const { data: cryptoList } = useGetCryptosQuery(count);
  const [fearValues, setFearValues] = useState([]);

  const { data: coinHistory, isFetching } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoData = cryptoList?.data?.coins;
  // console.log(cryptoList?.data?.coins);
  // console.log(cryptoData);
  // console.log(coinHistory);

  const { data: coin2History } = useGetCryptoHistory2Query({
    coin2Id,
    timeperiod2,
  });

  const coinHistoryDetails = coinHistory?.data?.history;
  const coin2HistoryDetails = coin2History?.data?.history;

  //retrieve the last 30 days of BTC and store in array to reference in chart
  try {
    if (coinHistoryDetails) {
      for (let i = 0; i < coinHistoryDetails.length; i++) {
        btcPrices.unshift(coinHistoryDetails[i].price);
      }
    }
  } catch (error) {
    console.log(`BTC history details error...${error}`);
  }

  try {
    if (coin2HistoryDetails) {
      for (let i = 0; i < coin2HistoryDetails.length; i++) {
        ethPrices.unshift(coin2HistoryDetails[i].price);
      }
    }
  } catch (error) {
    console.log(`ETH history details error...${error}`);
  }

  useEffect(() => {
    const fearData = async () => {
      await axios
        .get("https://api.alternative.me/fng/?limit=30")
        .then((f_data) => {
          setFearValues(f_data?.data?.data);
          //  console.log(f_data)
        })
        .catch((err) => {
          console.log(`Axios fear data retrieval errror...${err}`);
        });
    };
    fearData();
  }, []);


  //loop through fear index to get values and dates of the last 30 days in order to use for the chart
  for (let i = 0; i < fearValues.length; i++) {
    fearIndexValue.unshift(fearValues[i].value);
    fearIndexDates.unshift(
      new Date(fearValues[i].timestamp * 1000).toLocaleDateString()
    );
  }

  // ---- COIN/FEAR INDEX CHART SETTINGS AND DATA ---- //

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Bitcoin vs Fear Index",
        font: {
          size: 22
        }
      },
      //this option will disable the display of values on the chart itself as 'ChartDataLabels' component is registered globally, and the global function to disable isn't working
      //Chart.defaults.global.plugins.datalabels.display = false;
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: 'Fear Index'
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Coin Price'
        },
      },
    },
  };

  const labels = fearIndexDates;
  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Fear Index Value",
        data: fearIndexValue,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        type: "bar",
        // fill: true,
        lineTension: 0.8,
        label: "Bitcoin Price",
        data: btcPrices,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        type: "bar",
        // fill: true,
        lineTension: 0.8,
        label: "Ethereum Price",
        data: ethPrices,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y1",
      },
    ],
  };


  const createTableData = (rows) => {
    let content = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows[i];
      content.push(
        <tr key={item.name}>
          <td>
            {" "}
            <img
              className="img-fluid small-icon"
              src={item.iconUrl}
              alt="small coin icon"
            />
          </td>
          <td>{item.name}</td>
          <td>{parseFloat(item.price).toFixed(2)}</td>
          <td>{parseFloat(item.change).toFixed(2)}</td>
        </tr>
      );
    }
    return content;
  };

  if (isFetching | !coin2History) return <Spinner />;

  return (
    <>
      <Container>

        <Row className="mt-2">
          <Col md={6}>
            <div className="card chart-card">
              <div className="card-body pb-0">
                <h5 className="card-title font-weight-bold">Total Value of all Coins</h5>
                <p className="card-text mb-4">• May 2, 1:15PM •</p>
                <div className="d-flex justify-content-between">
                  <p className="display-4 align-self-end">$28,492.58</p>
                </div>
              </div>
            </div>

            <div className="card chart-card">
              <div className="card-body pb-0">
                <h5 className="card-title font-weight-bold">Total Value of all Stocks</h5>
                <p className="card-text mb-4">• May 2, 1:15PM •</p>
                <div className="d-flex justify-content-between">
                  <p className="display-4 align-self-end">$143,928.72</p>
                </div>
              </div>
            </div>
          </Col>

          <Col md={6}>
            <div className="card chart-card">
              <div className="card-body pb-0">
                <h5 className="card-title font-weight-bold">This Week's Crypto Trades</h5>
                <p className="card-text mb-4">12 Trades with 4 coins</p>
                <div className="d-flex justify-content-between">
                  <p className="display-4 align-self-end">+ $887.32</p>
                </div>
              </div>
            </div>

            <div className="card chart-card">
              <div className="card-body pb-0">
                <h5 className="card-title font-weight-bold">This Week's Stock Trades</h5>
                <p className="card-text mb-4">118 Trades with 22 stocks</p>
                <div className="d-flex justify-content-between">
                  <p className="display-4 align-self-end">- 12,629.38</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Card className="mt-5 text-center shadow radius-15">
            {/* // ---- COIN/FEAR INDEX CHART ---- // */}
            <Chart type="bar" data={data} options={options} />
          </Card>
        </Row>

        <Row className="mt-5">
          <Col md={6}>
            {/* // ---- TOP 10 COINS ---- // */}
            <Card className="radius-15 card text-center shadow">
              <Card.Body>
                <h2 className="text-center">Top 10 Coins</h2>
                <Table responsive="md">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Coin</th>
                      <th scope="col">Price</th>
                      <th scope="col">24 Hour Change</th>
                    </tr>
                  </thead>
                  <tbody>{createTableData(cryptoData)}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>


          {/* <Col md={6}>
        
            <h2 className="text-center">Portfolio Breakdown</h2>
                <OwnedChart />

      
          </Col> */}

        </Row>

        <Row>
          <Col>


            <h2 className="text-center">Portfolio Breakdown</h2>
            <OwnedChart />



          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeChart;
