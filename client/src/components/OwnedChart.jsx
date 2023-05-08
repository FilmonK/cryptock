import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from "axios";
import Spinner from "./Spins";
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
  const assetArray = []
  const [assets, setAssets] = useState([]);

  //get percentage ownership information from backend
  useEffect(() => {
    const getAssets = async () => {
      await axios
        .get("http://localhost:7160/positions")
        .then((data) => {
          // console.log(data?.data);
          setAssets(data?.data);
        })
        .catch((err) => {
          console.log(`Axios asset retrieve error: ${err}`);
        });
    };
    getAssets();
  }, []);


  try {
    for (let i = 0; i < assets.length; i++) {
      assetArray.push([assets[i]["symbol"], Number(assets[i]["qty"])])
    }
  } catch (error) {
    console.log(`Error: Failed to push data from google sheets to arrays...${error}`);
  }

  const sortedAssetObject = assetArray.sort(function (a, b) {
    return b[1] - a[1]
  })


  // get totals of crypto/stock in order to get to get percentage of ownership
  // then loop through items to get percentage of ownership for each item
  const itemTotals = sortedAssetObject.reduce((a, b) => {
    return a + b[1]
  }, 0)

  for (let index = 0; index < sortedAssetObject.length; index++) {
    let tempValue = 0
    //divde element owned by total to get percentage
    tempValue = ((sortedAssetObject[index][1] / itemTotals) * 100).toFixed(2)
    // add percentage to that element
    sortedAssetObject[index][2] = tempValue
  }

  console.log(sortedAssetObject)

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

  const labels = sortedAssetObject.slice(0,8).map((item) => item[0]);
  const data = {
    labels,
    datasets: [
      {
        label: "Owned",
        data: sortedAssetObject.slice(0,8).map((item) => item[2]),

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

  if (!assets | assetArray.length < 1) return <Spinner />

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default OwnedChart;
