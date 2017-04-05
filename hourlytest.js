const axios = require('axios');
const moment = require('moment-timezone');
const DARK_SKY_WEATHER_URL = 'https://api.darksky.net/forecast/d8cfabf907fbc83ecf0443921de62bc1/';
const requestUrl = `${DARK_SKY_WEATHER_URL}50.449988,30.523494?&units=si&extend=hourly?exclude=[currently,minutely,alerts,flags]`;

let dataBlock;
let timezone;
let hourly;
let daily;
// 157
axios.get(requestUrl).then((response) => {
    console.log('FROM SERVER');
    dataBlock = response.data;
    timezone = dataBlock.timezone;
    hourly = dataBlock.hourly.data;

    //First and last day delete
    daily = dataBlock.daily.data.slice(1, dataBlock.daily.data.length);
    daily.splice(-1, 1);
    let today = moment().tz(timezone);
    let week = {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: []
    };
    // Delete last day hour block
    let sliced = hourly.slice(0, hourly.length - today.hour() - 1);

    // Sort hours to days

    // sliced.forEach((hour) => {
    //     let day = moment(hour.time * 1000).tz(timezone).format('dddd');
    //     week[day].push(hour);
    // });
    // for (day in week) {
    //     week[day].forEach((hour) => {
    //         console.log(moment(hour.time * 1000).tz(timezone).format("dddd, MMMM Do YYYY, kk:mm:ss"));
    //     })
    //     console.log('=================================');
    //     // console.log(week[day]);
    // }

    // MODIFY DAILY OBJECT

    daily.forEach((day) => {
        day.hourly = [];
        let dayOfWeek = moment(day.time * 1000).tz(timezone).format('dddd');
        sliced.forEach((hour) => {
            let hourDay = moment(hour.time * 1000).tz(timezone).format('dddd')
            if (dayOfWeek === hourDay) {
                day.hourly.push(hour);
            }

        })
    })
    daily[0].hourly = daily[0].hourly.filter((hour) => {
        //     if (moment(hour.time * 1000).tz(timezone).hour() === 7 || moment(hour.time * 1000).tz(timezone).hour() === 21) {
        //         // console.log(moment(hour.time * 1000).tz(timezone).format("kk:mm:ss"), hour.temperature);
        return moment(hour.time * 1000).tz(timezone).hour() === 7 || moment(hour.time * 1000).tz(timezone).hour() === 21;
        //     }

    })
    console.log(daily[0].hourly);
    // let arr = [1, 2, 3, 4, 5, 6, 7];
    // console.log(arr.filter((number) => {
    //     if (number === 1) {
    //         return true;
    //     }
    // }))


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