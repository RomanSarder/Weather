const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const DARK_SKY_WEATHER_URL = 'https://api.darksky.net/forecast/d8cfabf907fbc83ecf0443921de62bc1/';

app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('you reached home page');
});
app.get('/api', function(req, res) {
    console.log('handling request...');
    let { country, city } = req.query;
    let requestUrl = `${DARK_SKY_WEATHER_URL}${req.query.lat},${req.query.lng}?&units=si&extend=hourly&lang=ru`
    axios.get(requestUrl).then((response) => {
        console.log('FROM SERVER');
        response.data.currently.city = city;
        response.data.currently.country = country;
        console.log(response.data.currently);
        res.send(response.data);
    }).catch(function(error) {
        if (error.response) {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
});


app.listen(PORT, function() {
    console.log('Express server is up on port 3000');
});