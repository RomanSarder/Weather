const axios = require('axios');

const GEOCODE_MAP_URL = "http://www.mapquestapi.com/geocoding/v1/address?key=P0SdZ4RTwl0WQPQze6mlsPndboPn8JWg&maxResults=1&location=";

module.exports = {
  getOne: function (location) {
    let encodedLocation = encodeURIComponent(location);
    let requestGeoUrl = `${GEOCODE_MAP_URL}${encodedLocation}`;
    let geoResponse;
    return axios.get(requestGeoUrl)
      .then(function(res) {
        console.log(res);
        let {lat, lng} = res.data.results[0].locations[0].displayLatLng;
        let {adminArea5, adminArea1} = res.data.results[0].locations[0];
        return {
          lat,
          lng,
          adminArea1,
          adminArea5
        }
      }).then(function(cords) {
        console.log(cords);
        let requestWeatherUrl = `http://powerful-headland-90755.herokuapp.com/api?lat=${cords.lat}&lng=${cords.lng}&country=${cords.adminArea1}&city=${cords.adminArea5}`;
        return axios.get(requestWeatherUrl).then(function (res) {
             console.log('FROM CLIENT');
             console.log(res.data);
             return res.data;
         }).catch(function (error) {
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
    })
  }
}
