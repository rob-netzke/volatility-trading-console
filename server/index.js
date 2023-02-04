const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
require('dotenv').config();
const http = require('http');
const axios = require('axios');
const cheerio = require("cheerio");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../build')));
const server = http.createServer(app);

app.post('/api/prices', async function(req, res) {
    const stockList = ["SPX", "RUT", "NDX", "VIX"] 
    const prices = {}
    for (const TICKER of stockList) {
        let config = {
            method: "GET",
            url: "https://api.twelvedata.com/price",
            params: {
                symbol: TICKER,
                apikey: process.env.TWELVE_API
            }
        }
        try {
            let response = await axios(config)
            // console.log(response.data)
            prices[TICKER] = parseFloat(response.data.price).toFixed(2)
        } catch (error) {
            console.log("error from server for stocks")
            prices[TICKER] = "ERROR"
        }
    } 
    res.json(prices)
})

app.post('/api/pc', async function (req, res) {
    let url = "https://www.cboe.com/us/options/market_statistics/"
    const ratios = []
    try {
        const scrape = await axios(url)
        const html_data = scrape.data
        const $ = cheerio.load(html_data)
        $('table.data-table').each(function(j, elm) {
            if (j === 1) {
                $(elm).children().each(function(i, child) {
                    $(child).children().each(function(k, child2) {
                        ratios.push($(child2).text().replace('\n', "").replace("/\s+/g", '').trim()) 
                    })
                })
            }
        })
    } catch(error) {
        console.log(error)
    }
    let data = {
        Total: ratios
    }
    res.json(data)
})

app.post('/api/iv', async function(req, res) {
    const stockList = ["SPX", "RUT"] 
    const iv = {}
    for (const stock of stockList) {
        let url = `https://www.ivolatility.com/options/${stock}/CBOE/`
        try {
            const scrape = await axios(url)
            const html_data = scrape.data
            const $ = cheerio.load(html_data)
            iv[stock] = $('font.s2').eq(38).text()
        } catch {
            iv[stock] = "ERROR"
        }
    }
    res.json(iv)
})

app.post('/api/vol', async function (req, res) {
    const modelList = ["SGJR", "SGARCH", "RGJR", "RGARCH", "NGJR", "NGARCH"]
    const phraseList = {
        "SGJR": "SPY GJR-GARCH",
        "SGARCH": "SPY GARCH",
        "RGJR": "RUT GJR-GARCH",
        "RGARCH": "RUT GARCH",
        "NGJR": "NDX GJR-GARCH",
        "NGARCH": "NDX GARCH",
    }
    const urlList = ["https://vlab.stern.nyu.edu/volatility/VOL.SPX%3AIND-R.GJR-GARCH",
                     "https://vlab.stern.nyu.edu/volatility/VOL.SPX%3AIND-R.GARCH",
                     "https://vlab.stern.nyu.edu/volatility/VOL.RTY%3AIND-R.GJR-GARCH",
                     "https://vlab.stern.nyu.edu/volatility/VOL.RTY%3AIND-R.GARCH",
                     "https://vlab.stern.nyu.edu/volatility/VOL.CCMP%3AIND-R.GARCH",
                     "https://vlab.stern.nyu.edu/volatility/VOL.CCMP%3AIND-R.GJR-GARCH"]
    
    const volPredictions = {}

    try {
        const scrape = await axios(urlList[0])
        const html_data = scrape.data
        const $ = cheerio.load(html_data)
        volPredictions["prediction"] = $('.css-1c44cx6').text().split(",")[0]
    } catch(error) {
        console.log(error)
    }

    for (const num of [0, 1, 2, 3, 4, 5]) {
        try {
            const scrape = await axios(urlList[num])
            const html_data = scrape.data;
            const $ = cheerio.load(html_data)
            volPredictions[modelList[num]] = phraseList[modelList[num]] + ": " + $('h6 span').text()
        } catch {
            volPredictions[modelList[num]] = phraseList[modelList[num]] + ": NaN"
        }
    }
    res.json(volPredictions)
})

app.post('/api/calendar', async function(req, res) {
    url = "https://finviz.com/calendar.ashx"
    times = []
    annoucements = []

    try {
        const scrape = await axios(url)
        const html_data = scrape.data
        const $ = cheerio.load(html_data)
        $('table.calendar tbody').each(function(j, elm) {
            $(elm).children().each(function(k, child) {
                $(child).children().each(function(i, child2) {
                    if (i === 0) {
                        times.push($(child2).text())
                    }
                    if (i === 2) {
                        annoucements.push($(child2).text())
                    }
                })
            })
        })
        let data = {
            t: times,
            a: annoucements
        }
        res.json(data)
    } catch(error) {
        console.log('fetching error')
        console.log(error)
        res.json({})
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});