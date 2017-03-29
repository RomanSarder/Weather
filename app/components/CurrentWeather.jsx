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
                   {/*<span className="current-header">Сейчас {timeNow}</span>*/}
                    <span className="skycon-main"><Skycon color='#35656b' icon={currentForecast.icon}/></span>
                    <span className="temperature-main">{this.floorTemp(currentForecast.temperature)}&nbsp;°</span>
                    <span className="summary-main">{currentForecast.summary}</span>
                    <span className="feelslike-main">Feels like: {this.floorTemp(currentForecast.apparentTemperature)}&nbsp;°</span>
                    {/*<span className="nexthour-main">Следующий час: {nextHourForecast.summary}</span>*/}
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