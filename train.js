const moment = require('moment-timezone');

let date = moment(1490103819 * 1000).tz('Europe/Kiev');

console.log(date.date());
console.log(date.month());
console.log(date.format('MMMM'));
console.log(date.format('dddd'));