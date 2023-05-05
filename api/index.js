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

const port = process.env.PORT | 3000

// route to get positions from alpaca
app.get('/positions', async (req, res) => {
    await alpaca
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
    try {
        await alpaca.createOrder({
            symbol: 'HSIC',
            qty: 49,
            side: 'buy',
            type: 'market',
            time_in_force: 'gtc'
        }).then(data => {
            console.log(data)
        })

    } catch (error) {
        console.log(error)
    }
})

// get account activities and by default 'FILL' types
app.get('/activity', async (req, res) => {
    try {
        await alpaca.getAccountActivities({
            activityTypes: 'FILL',
            // until,
            // after,
            // direction,
            // date,
            // pageSize,
            // pageToken,
        })
            .then((data) => {
                console.log(data)
                res.send(data)
            })
    } catch (error) {
        console.log(error)
    }
})




app.listen(port, (req, res) => {
    console.log(`App is now listening on port ${port}`)
})