const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const WebSocket = require('ws');
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({
    keyId: process.env.APCA_API_KEY_ID,
    secretKey: process.env.APCA_API_SECRET_KEY,
    paper: true,
  });

require('dotenv').config()

//Middleware
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cors())

const port = process.env.PORT

// route to get positions from alpaca
app.get('/positions', async (req, res) => {
    const closedOrders = await alpaca
        .getOrders({
            status: "closed",
            limit: 100,
            nested: true, // show nested multi-leg orders
        })
        .then((data) => {
            console.log(data)
            res.send(data)
        })
        .catch(error => {
            console.log(error)
        })  
})

// route to buy and sell positions
app.post('/buypositions', async (req, res) => {
    //time_type = "day" or "gtc"
    const { symbol_type, qty, side, buy_type, time_type } = req.body

    //these are placeholder values until the these routes are completed
    const buyPositions = async () => {
        try {
            let buyOrder = await alpaca.createOrder({
                symbol: 'ETH/USD',
                qty: '0.10',
                side: 'buy',
                type: 'market',
                time_in_force: 'gtc'
            })
        } catch (error) {
            console.log(error)
        }
    }
})



app.listen(port, (req, res) => {
    console.log(`App is now listening on port ${port}`)
})