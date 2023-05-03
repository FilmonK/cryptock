import React, { useState } from "react";
import millify from "millify";
import { Chart, registerables } from "chart.js";
import {
  useGetCryptosQuery,
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoHistory2Query,
  useGetCryptoHistory3Query,
  useGetCryptoHistory4Query,
} from "../services/cryptoApi";

import CryptoChart from "./CryptoChart";
import Spinner from "./Spins";
import { Col, Row, Form, Container } from "react-bootstrap"
import "../css/charts.css";

Chart.register(...registerables);

const Charts = () => {
  //initially set to Bitcoin
  const [coinId, setCoinID] = useState("Qwsogvtv82FCd");
  const [timeperiod, setTimePeriod] = useState("3h");
  const { data, isFetching } = useGetCryptoDetailQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetails = data?.data?.coin;


  const [coin2Id, setCoinID2] = useState("Qwsogvtv82FCd");
  const [timeperiod2, setTimePeriod2] = useState("24h");
  const { data: coinDetail2 } = useGetCryptoDetailQuery(coin2Id);
  const { data: coin2History } = useGetCryptoHistory2Query({
    coin2Id,
    timeperiod2,
  });

  const cryptoDetails2 = coinDetail2?.data?.coin;

  const [coin3Id, setCoinID3] = useState("Qwsogvtv82FCd");
  const [timeperiod3, setTimePeriod3] = useState("7d");
  const { data: coinDetail3 } = useGetCryptoDetailQuery(coin3Id);
  const { data: coin3History } = useGetCryptoHistory3Query({
    coin3Id,
    timeperiod3,
  });

  const cryptoDetails3 = coinDetail3?.data?.coin;


  const [coin4Id, setCoinID4] = useState("Qwsogvtv82FCd");
  const [timeperiod4, setTimePeriod4] = useState("30d");
  const { data: coinDetail4 } = useGetCryptoDetailQuery(coin4Id);
  const { data: coin4History } = useGetCryptoHistory4Query({
    coin4Id,
    timeperiod4,
  });

  const cryptoDetails4 = coinDetail4?.data?.coin;

  //this pulls the list of top 100 coins, from which we can get name, uuid, and basic market information
  const { data: coinList } = useGetCryptosQuery(100);

  //date measurements which come from coinranking api
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  if (isFetching) return <Spinner />;

  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col md={6}>
            <Form.Select
              defaultValue="3h"
              className="select-timeperiod"
              placeholder="Select Timeperiod"
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <option>Select time period</option>
              {time.map((date) => (
                <option value={date}>{date}</option>
              ))}
            </Form.Select>

            <Form.Select className="mb-5" onChange={(e) => setCoinID(e.target.value)}>
              <option>crypto selection</option>
              {coinList?.data?.coins.map((coin) => (
                <option value={coin.uuid}>{coin.name}</option>
              ))}
            </Form.Select>

            <CryptoChart
              coinHistory={coinHistory}
              currentPrice={millify(cryptoDetails?.price)}
              coinName={cryptoDetails?.name}
            />
          </Col>

          {/* ------------------------------------------------ */}
          <Col md={6}>
            <Form.Select
              defaultValue="24h"
              className="select-timeperiod"
              placeholder="Select Timeperiod"
              onChange={(e) => setTimePeriod2(e.target.value)}
            >
              <option>Select time period</option>
              {time.map((date) => (
                <option value={date}>{date}</option>
              ))}
            </Form.Select>

            <Form.Select className="mb-5" onChange={(e) => setCoinID2(e.target.value)}>
              <option>crypto selection</option>
              {coinList?.data?.coins.map((coin) => (
                <option value={coin.uuid}>{coin.name}</option>
              ))}
            </Form.Select>

            <CryptoChart
              coinHistory={coin2History}
              currentPrice={millify(cryptoDetails2?.price)}
              coinName={cryptoDetails2?.name}
            />
          </Col>
        </Row>
        {/* ------------------------------------------------ */}
        <Row className="mt-4">
          <Col md={6}>
            <Form.Select
              defaultValue="7d"
              className="select-timeperiod"
              placeholder="Select Timeperiod"
              onChange={(e) => setTimePeriod3(e.target.value)}
            >
              <option>Select time period</option>
              {time.map((date) => (
                <option value={date}>{date}</option>
              ))}
            </Form.Select>

            <Form.Select className="mb-5" onChange={(e) => setCoinID3(e.target.value)}>
              <option>crypto selection</option>
              {coinList?.data?.coins.map((coin) => (
                <option value={coin.uuid}>{coin.name}</option>
              ))}
            </Form.Select>

            <CryptoChart
              coinHistory={coin3History}
              currentPrice={millify(cryptoDetails3?.price)}
              coinName={cryptoDetails3?.name}
            />
          </Col>

          <Col md={6}>
            <Form.Select
              defaultValue="30d"
              className="select-timeperiod"
              placeholder="Select Timeperiod"
              onChange={(e) => setTimePeriod4(e.target.value)}
            >
              <option>Select time period</option>
              {time.map((date) => (
                <option value={date}>{date}</option>
              ))}
            </Form.Select>

            <Form.Select className="mb-5" onChange={(e) => setCoinID4(e.target.value)}>
              <option>crypto selection</option>
              {coinList?.data?.coins.map((coin) => (
                <option value={coin.uuid}>{coin.name}</option>
              ))}
            </Form.Select>

            <CryptoChart
              coinHistory={coin4History}
              currentPrice={millify(cryptoDetails4?.price)}
              coinName={cryptoDetails4?.name}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Charts;
