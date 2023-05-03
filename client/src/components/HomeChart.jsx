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

import { Table, Col, Row, Container } from "react-bootstrap"
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
  console.log(cryptoData);
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
        btcPrices.push(coinHistoryDetails[i].price);
      }
    }
  } catch (error) {
    console.log(`BTC history details error...${error}`);
  }

  try {
    if (coin2HistoryDetails) {
      for (let i = 0; i < coin2HistoryDetails.length; i++) {
        ethPrices.push(coin2HistoryDetails[i].price);
      }
    }
  } catch (error) {
    console.log(`ETH history details error...${error}`);
  }

  //retreiving fear index....consider moving to toolkit
  useEffect(() => {
    const fearData = async () => {
      await axios
        .get("https://api.alternative.me/fng/?limit=30")
        .then((f_data) => {
          setFearValues(f_data?.data?.data);
          //  console.log(f_data)
        })
        .catch((err) => {
          console.log(`axios fear data errro...${err}`);
        });
    };
    fearData();
  }, []);

  //loop through fear index to get values and dates of the last 30 days in order to use for the chart
  for (let i = 0; i < fearValues.length; i++) {
    fearIndexValue.push(fearValues[i].value);
    fearIndexDates.push(
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
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
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
        type: "line",
        // fill: true,
        lineTension: 0.8,
        label: "Bitcoin Price",
        data: btcPrices,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        type: "line",
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
        <tr>
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

  if (isFetching) return <Spinner />;

  return (
    <>
      <Container>
        <Row className="mb-5">
        {/* // ---- COIN/FEAR INDEX CHART ---- // */}
          <Chart type="bar" data={data} options={options} />
        </Row>

        <Row className="mt-5">
          <Col>
          {/* // ---- TOP 10 COINS ---- // */}
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
          </Col>

          <Col>
          {/* // ---- OWNERSHIP DOUGHNUT ---- // */}
          <h2 className="text-center">Portfolio Breakdown</h2>
            <OwnedChart />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeChart;
