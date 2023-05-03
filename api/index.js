const express = require('express');
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');
const { auth } = require('google-auth-library');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({
    extended: true
}))


//Middleware
app.use(express.json());
app.use(cors())

require('dotenv').config()

//route to get trades from google sheet
app.get('/trades', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.KEYFILE,
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })


    //create a new client 
    const client = await auth.getClient();
    const googleSheets = await google.sheets({
        version: 'v4', 
        auth: client
    })
    const spreadsheetId = process.env.SPREADSHEET_ID

    //testing getting meta data
    const getMetaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId, 
    });

    //testing receiving data from sheet
    const getSSData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Sheet1!A:H'
    })
    
    // res.send(getMetaData);
    res.send(getSSData);

})


//route to get ownership percentages
app.get('/all', async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.KEYFILE,
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    const client = await auth.getClient();
    const googleSheets = await google.sheets({
        version: 'v4',
        auth: client
    })

    const spreadsheetId = process.env.SPREADSHEET_ID
    const getPercData = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Sheet2!A:B'
    })

    res.send(getPercData)
})



app.listen(6000, (req, res) => {
    console.log(`App is now listening on port 5000`)
})