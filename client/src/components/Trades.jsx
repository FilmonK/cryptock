import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Spinner from "./Spins";

const Trades = () => {
  const [tradeActivity, setTradeActivity] = useState([])

// retrieving trading activity 
useEffect(() => {
  const trades = async () => {
    await axios.get(`http://localhost:7160/activity`)
    .then((a_data) => {
      setTradeActivity(a_data?.data)
      console.log(a_data?.data)
    })
    .catch((err) => {
      console.log(`Axios activity data retrieval errror: ${err}`);
    });
  };
  trades()
}, [])

  //the purpose of this function is to assign className dynamically to the tables
  const rowColor = (buy_type) => {
    if (buy_type === "buy") return "table-success"
    if (buy_type === "sell") return "table-danger"
    if (buy_type === "deposit") return "table-info"
  };

  // creating the table by storing elements into an array before rendering below
  const createTableData = rows => {
    let content = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i]["type"] !== "partial_fill") {
      content.push(
        //getting the "side" value
        <tr className={rowColor(rows[i]["side"])}>
          <td>{rows[i]["order_id"]}</td>
          <td>{rows[i]["transaction_time"]}</td>
          <td>{rows[i]["type"]}</td>
          <td>{rows[i]["symbol"]}</td>
          <td>{rows[i]["side"]}</td>
          <td>{rows[i]["cum_qty"]}</td>
          <td>{rows[i]["price"]}</td>
        </tr>
      );
      }
    }
    return content;
  };

  if (!tradeActivity) return <Spinner />

  return (
    <>
      <Container>
        <Table responsive="md">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Symbol</th>
              <th scope="col">Order Type</th>
              <th scope="col">Buy/Sell Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
           {createTableData(tradeActivity)}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Trades;

