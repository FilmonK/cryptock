import React, { useState, useEffect } from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Row, Form, Container, Card } from "react-bootstrap"
import Spinner from "./Spins"
import "../css/cryptocurrencies.css";

const Cryptocurrencies = () => {
  const count = 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchCrypto, setSearchCrypto] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchCrypto.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchCrypto]);

  if (isFetching) return <Spinner />

  return (
    <>
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              onChange={(e) => setSearchCrypto(e.target.value)}
              type="text"
              className="select-crypto"
              placeholder="Enter crypto name"
            />
          </Form.Group>
        </Form>
      </div>

      <Container className="mt-5">
        <Row xs={1} md={4} className="g-4">
          {cryptos?.map((crypto) => (
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                key={crypto.uuid}
                className={crypto.change > 0.0 ? "card radius-15 border-start border-0 border-3 shadow on-hover border-success" : "card radius-15 border-start border-0 border-3 shadow on-hover border-danger"}>
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div>
                      <p className="mb-0 text-secondary">{crypto.rank}. {crypto.name}</p>
                      <h4 className="my-1 text-info">Price: {millify(crypto.price)}</h4>
                      <p className="mb-0 font-13">Daily Change: {millify(crypto.change)}</p>
                    </div>
                    <img
                      variant="top"
                      className="card-imgs mt-3 mx-auto"
                      src={crypto.iconUrl}
                      alt="coin icon"
                    />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Cryptocurrencies;