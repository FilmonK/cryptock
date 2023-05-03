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
        <Row xs={1} md={5} className="g-4">
          {cryptos?.map((crypto) => (
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card className="text-center shadow rounded on-hover" key={crypto.uuid}>
                <Card.Img
                  variant="top"
                  className="card-imgs mt-3 mx-auto"
                  src={crypto.iconUrl}
                />
                <Card.Body>
                  <Card.Title>{crypto.rank}. {crypto.name}</Card.Title>
                  <hr />
                  <Card.Text>
                    <p>Price: {millify(crypto.price)}</p>
                    <p>Market Cap: {millify(crypto.marketCap)}</p>
                    <p>Daily Change: {millify(crypto.change)}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Cryptocurrencies;
