const React = require('react');
const Skycon = require('Skycon');
const moment = require('moment-timezone');

const CurrentWeather = React.createClass({
    floorTemp: function(temperature) {
        return temperature > 0 ? `+${Math.round(temperature)}` : Math.round(temperature); 
    },
    render: function() {
        let {currentForecast, nextHourForecast, timeZone} = this.props;
        let timeNow = moment().tz(timeZone).format('HH:mm');
        return (
            <div className="column center aligned" id="current">
                   <span className="current-header">Currently {timeNow}</span>
                    <span className="skycon-main"><Skycon icon={currentForecast.icon}/></span>
                    <span className="temperature-main">{this.floorTemp(currentForecast.temperature)}&nbsp;°</span>
                    <span className="summary-main">{currentForecast.summary}</span>
                    <span className="feelslike-main">Feels like {this.floorTemp(currentForecast.apparentTemperature)}&nbsp;°</span>
                    <span className="nexthour-main">Next hour: {nextHourForecast.summary}</span>
                    <div className="ui large horizontal divided list">
                        <div className="item">
                            <div className="content">
                                <div className="header">Humidity: {currentForecast.humidity}</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                 <div className="header">Windspeed: {currentForecast.windSpeed}</div>
                             </div>
                        </div>
                        <div className="item">
                            <div className="content">
                                <div className="header">Precib: {currentForecast.precipProbability}</div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
})

module.exports = CurrentWeather;