const axios = require('axios');
const moment = require('moment');
const DARK_SKY_WEATHER_URL = 'https://api.darksky.net/forecast/d8cfabf907fbc83ecf0443921de62bc1/';
const requestUrl = `${DARK_SKY_WEATHER_URL}50.449988,30.523494?&units=si&extend=hourly?exclude=[daily,currently,minutely,alerts,flags]`;

let dataBlock;
let timezone;
axios.get(requestUrl).then((response) => {
    console.log('FROM SERVER');
    console.log(response.data);
    dataBlock = response.data;
    console.log('------------------------------------------------------------------------------');
    console.log(dataBlock);
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