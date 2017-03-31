const React = require('react');
const Skycon = require('Skycon');
const moment = require('moment-timezone');

const CurrentWeather = React.createClass({
    floorTemp: function(temperature) {
        return temperature > 0 ? `+${Math.round(temperature)}` : Math.round(temperature); 
    },
    render: function() {
        let {currentForecast, todayDate, timeZone, todayWeather} = this.props;
        let timeNow = moment(todayDate * 1000).tz(timeZone);
        let todayDay = timeNow.format('dddd');
        let date = timeNow.date();
        let todayMonth = timeNow.format('MMMM')
        return (
            <div className="column center aligned" id="current">
                   <span className="current-date">{`${date} ${todayMonth}, ${todayDay}`}</span>
                    <span className="skycon-today"><Skycon color='#35656b' icon={todayWeather.icon}/></span>
                    <span className="today-weather">
                    <span className="today-max">{this.floorTemp(todayWeather.temperatureMax)}&nbsp;°</span>
                    <span className="today-min">{this.floorTemp(todayWeather.temperatureMin)}&nbsp;°</span>
                    <span className="today-summary">{todayWeather.summary}</span>
                    </span>
                    <span className="temperature-main"><span className="current-icon"><Skycon color='#35656b' icon={currentForecast.icon}/></span>{this.floorTemp(currentForecast.temperature)}&nbsp;°</span>
                    <span className="summary-main">{currentForecast.summary} Now</span>
                    <span className="feelslike-main">Feels like: {this.floorTemp(currentForecast.apparentTemperature)}&nbsp;°</span>
                    <div className="ui large horizontal divided list">
                        <div className="item">
                            <div className="content">
                                <div className="header">Humidity: {currentForecast.humidity}</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                 <div className="header">Wind: {currentForecast.windSpeed}</div>
                             </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Precip: {currentForecast.precipProbability}</div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
})

module.exports = CurrentWeather;