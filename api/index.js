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

app.use(express.urlencoded({
    extended: true
}))


//Middleware
app.use(express.json());
app.use(cors())

require('dotenv').config()

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



app.listen(6000, (req, res) => {
    console.log(`App is now listening on port 5000`)
})