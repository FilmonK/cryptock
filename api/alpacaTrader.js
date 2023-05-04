const WebSocket = require('ws');
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({
    keyId: process.env.APCA_API_KEY_ID,
    secretKey: process.env.APCA_API_SECRET_KEY,
    paper: true,
  });

const wss = new WebSocket("wss://stream.data.alpaca.markets/v1beta1/news");

// wss.on('open', function () {
//     console.log("Websocket connected!");

//     const authMsg = {
//         action: 'auth',
//         key: process.env.APCA_API_KEY_ID,
//         secret: process.env.APCA_API_SECRET_KEY
//     };

//     wss.send(JSON.stringify(authMsg));

//     // Subscribe to all news feeds
//     const subscribeMsg = {
//         action: 'subscribe',
//         news: ['*'] // ["TSLA"]
//     };
//     wss.send(JSON.stringify(subscribeMsg));
// });

// wss.on('message', async function (message) {
//     console.log("Message is " + message);
//     // message is a STRING
//     const currentEvent = JSON.parse(message)[0];
//     // "T": "n" newsEvent
//     if (currentEvent.T === "n") { // This is a news event
//         let companyImpact = 0;

//         // Ask ChatGPT its thoughts on the headline
//         const apiRequestBody = {
//             "model": "gpt-3.5-turbo",
//             "messages": [
//                 { role: "system", content: "Only respond with a number from 1-100 detailing the impact of the headline." },
//                 { role: "user", content: "Given the headline '" + currentEvent.headline + "', show me a number from 1-100 detailing the impact of this headline." }
//             ]
//         }

//         await fetch("https://api.openai.com/v1/chat/completions", {
//             method: "POST",
//             headers: {
//                 "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(apiRequestBody)
//         }).then((data) => {
//             return data.json();
//         }).then((data) => {
//             // console.log(data);
//             console.log(data.choices[0].message);
//             companyImpact = parseInt(data.choices[0].message.content);
//         });

//         // Make trades based on the output (of the impact saved in companyImpact)
//         const tickerSymbol = currentEvent.symbols[0];

//         console.log(companyImpact)

//         // 1 - 100, 1 being the most negative, 100 being the most positive impact on a company.
//         if (companyImpact >= 60) { // if score >= 70 : BUY STOCK
//             // Buy stock
//             let order = await alpaca.createOrder({
//                 symbol: tickerSymbol,
//                 qty: Math.floor(Math.random() * 100),
//                 side: 'buy',
//                 type: 'market',
//                 time_in_force: 'day' 
//             });
//             // } else if (companyImpact <= 30) { // else if impact <= 30: SELL ALL OF STOCK
//             //     // Sell stock
//             //     let closedPosition = alpaca.closePosition(tickerSymbol); //(tickerSymbol);
//             // }
//         }
//     }
// });

// ---- Orders ---- //

const closedOrders = alpaca
  .getOrders({
    status: "closed",
    limit: 100,
    nested: true, // show nested multi-leg orders
  })
  .then((data) => {
   console.log(data)
  
  })
  .catch(error => {
    console.log(error)
  })

  