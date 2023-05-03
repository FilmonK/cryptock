import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Spinner from "./Spins";

const Trades = () => {
  const [tradeInfo, setTradeInfo] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      await axios
        .get("http://localhost:5000/trades")
        .then((ss_data) => {
          setTradeInfo(ss_data?.data?.data?.values);
        })
        .catch((err) => {
          console.log(`axios trade state error...${err}`);
        });
    };
    getInfo();
  }, []);


  //the purpose of this function is to assign className dynamically to the tables
  const rowColor = (buy_type) => {
    if (buy_type === "buy") return "table-success"
    if (buy_type === "sell") return "table-danger"
    if (buy_type === "deposit") return "table-info"
  };

  //due to google sheets api return nested arrays, created a function to loop through each item and be able to specify index in order to use the "rowColor" function above
  const createTableData = rows => {
    let content = [];
    for (let i = 1; i < rows.length; i++) {
      const item = rows[i];
      content.push(
        <tr className={rowColor(item[2])}>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
          <td>{item[2]}</td>
          <td>{item[3]}</td>
          <td>{item[4]}</td>
          <td>{item[5]}</td>
          <td>{item[6]}</td>
          <td>{item[7]}</td>
          <td>{item[8]}</td>
        </tr>
      );
    }
    return content;
  };

  if (!tradeInfo) return <Spinner />

  return (
    <>
      <Container>
        <Table responsive="md">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Ticker</th>
              <th scope="col">Name</th>
              <th scope="col">Buy/Sell Quantity</th>
              <th scope="col">Coin Price</th>
              <th scope="col">Fiat Value</th>
            </tr>
          </thead>
          <tbody>
           {createTableData(tradeInfo)}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Trades;

