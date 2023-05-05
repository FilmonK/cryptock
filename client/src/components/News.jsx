import React, { useState } from "react";
import moment from "moment";
import { Form, Card, ListGroup, Col, Row, Container } from "react-bootstrap"
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Spinner from "./Spins";
import "../css/news.css";

//change demo image!!!!!!!!!
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = () => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: 10,
  });
  //getting the top 100 coins in order to use in the dropdown
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Spinner />;
  if (isFetching) return <Spinner />

  return (
    <>
      <Container className="mt-5">
        {/* Dropdown for crypto selection */}
        <Form.Select
          showSearch
          className="select-news"
          placeholder="Select a Crypto"
          optionFilterProp="children"
          onChange={(e) => setNewsCategory(e.target.value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <option>crypto selection</option>
          {data?.data?.coins.map((coin) => (
            <option value={coin.name}>{coin.name}</option>
          ))}
        </Form.Select>

        <Row xs={1} md={3} className="g-4 mt-5">
          {/* New Section */}
          {cryptoNews.value.map((news, i) => (
            <Col>
              <Card className="radius-15 news-card shadow on-hover">
                <Card.Img
                  className="newscard-img mx-auto mt-3"
                  variant="top"
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                />
                <Card.Body>
                  <Card.Title>
                    {news.name.length > 30
                      ? `${news.name.substring(0, 30)}...`
                      : news.name}
                  </Card.Title>
                  <Card.Text>
                    {/* render news description completely if less than 100 characters */}
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </Card.Text>
                </Card.Body>

                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      <div className="provider-container">
                        <img
                          className="icon-img"
                          src={
                            news.provider[0]?.image?.thumbnail?.contentUrl ||
                            demoImage
                          }
                          alt="avatar news media"
                        />
                        <p>{news.provider[0]?.name}</p>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <div className="provider-container">
                        <p className="small">
                          {moment(news.datePublished).startOf("ss").fromNow()}
                        </p>
                        <Card.Link href={news.url}>Link to Story</Card.Link>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default News;
