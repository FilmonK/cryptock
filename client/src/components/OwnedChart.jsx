import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from "axios";
import "../css/cryptochart.css";
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
  Legend,
  ChartDataLabels
);


const OwnedChart = () => {
  const coinsOwnedLabel = [];
  const coinsOwnedPercentages = [];
  const [assets, setAssets] = useState([]);

  //get percentage ownership information from backend
  useEffect(() => {
    const getCoinOwned = async () => {
      await axios
        .get("http://localhost:5000/all")
        .then((coins) => {
        //   console.log(coins?.data?.data?.values);
          setAssets(coins?.data?.data?.values);
        })
        .catch((err) => {
          console.log(`axios google sheet retrieve error...${err}`);
        });
    };
    getCoinOwned();
  }, []);

  //looping through googlesheets api response which returns nested arrays
  try {
    for (let i = 1; i < assets.length; i++) {
      const item = assets[i];
      coinsOwnedLabel.push(item[0]);
      coinsOwnedPercentages.push(item[1]);
    }
  } catch (error) {
    console.log(
      `Error: Failed to push data from google sheets to arrays...${error}`
    );
  }

  
  // ---- OWNERSHIP CHART ---- //
  const options = {
      plugins: {
          datalabels: {
              formatter: (value) => {
                  return value + '%'
              },
              font: {
                size: 18
              }
          }
      },
    
  };

  const labels = coinsOwnedLabel;
  const data = {
    labels,
    datasets: [
      {
        label: "Owned",
        data: coinsOwnedPercentages,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <Doughnut type="bar" data={data} options={options} />
    </>
  );
};

export default OwnedChart;
