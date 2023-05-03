import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Form, Container } from "react-bootstrap"
import CryptoChart from "./CryptoChart";
import Spinner from "./Spins";
import {
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import "../css/cryptodetails.css";

import { BsCurrencyDollar, BsHash, BsFillAlarmFill, BsCurrencyExchange, BsGraphUp, BsCartPlus, BsCollection, BsSortUp, BsCheck2, BsFileEarmarkBreak, BsStopCircle } from "react-icons/bs";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Spinner />;


  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <BsCurrencyDollar />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <BsHash /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <BsFillAlarmFill />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <BsCurrencyExchange />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <BsGraphUp />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <BsCartPlus />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <BsCollection />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <BsCheck2 />
      ) : (
        <BsStopCircle />
      ),
      icon: <BsSortUp />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <BsFileEarmarkBreak />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <BsFileEarmarkBreak />,
    },
  ];

  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <h2 className="coin-name">
            {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
          </h2>
          <p>
            {cryptoDetails.name} live price in US Dollar (USD). View value
            statistics, market cap and supply.
          </p>
        </Col>

        <Form.Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Timeperiod"
          onChange={(e) => setTimePeriod(e.target.value)}
        >
          <option>Select time period</option>
          {time.map((date) => (
            <option value={date}>{date}</option>
          ))}
        </Form.Select>

        <CryptoChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails?.price)}
          coinName={cryptoDetails?.name}
        />
      </Col>

  {/* // ---- BOTTOM SECTION ---- // */}
      <Container>
        <Row>
          <Col className="stats-container">
            <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <h3 className="coin-details-heading">
                  {cryptoDetails.name} Value Statistics
                </h3>
              </Col>
              {stats.map(({ icon, title, value }) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <h5>{icon}</h5>
                    <h5>{title}</h5>
                  </Col>
                  <h3 className="stats">{value}</h3>  
                </Col>   
              ))}
            </Col>
          </Col>

          <Col>
            <Col className="coin-value-statistics-heading">
              <h3 className="coin-details-heading">Market and Exchanges</h3>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <h5>{icon}</h5>
                  <h5>{title}</h5>
                </Col>
                <h5 className="stats">{value}</h5>
              </Col>
            ))}
          </Col>
        </Row>

        <Row className="d-flex justify-content-between">
        {/* <Col className="coin-desc-link d-flex justify-content-between"> */}
          <Col className="coin-desc">
            <h3 className="coin-details-heading">
              What is {cryptoDetails.name}?
            </h3>
            {HTMLReactParser(cryptoDetails.description)}
          </Col>
          <Col className="coin-links">
            <h3 className="coin-details-heading">{cryptoDetails.name} Links</h3>
            {cryptoDetails.links?.map((link) => (
              <h4 className="d-flex justify-content-between mb-4" key={link.name}>
                <h3 className="link-name">{link.type}</h3>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </h4>
            ))}
          </Col>
        </Row>
       
      </Container>
    </>
  );
};

export default CryptoDetails;
