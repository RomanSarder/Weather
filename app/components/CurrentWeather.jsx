const React = require('react');
const Skycon = require('Skycon');

const CurrentWeather = React.createClass({
    floorTemp: function(temperature) {
        return temperature > 0 ? `+${Math.round(temperature)}` : Math.round(temperature); 
    },
    render: function() {
        let {currentForecast, nextHourForecast} = this.props;
        return (
            <div className="column center aligned" id="current">
                    <div className="ui section divider"><span>Now</span><span id="current-time">15:36</span></div>
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