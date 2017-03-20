const React = require('react');
const Skycon = require('Skycon');

const ForecastPresentation = React.createClass({
    floorTemp: function(temperature) {
        return temperature > 0 ? `+${Math.floor(temperature)}` : Math.floor(temperature); 
    },
    render: function() {
        let {todayForecast, nextHourForecast, currentForecast } = this.props;
        return(
            <div className="row one column centered unpadded">
                <div className="column center aligned">
                    <div className="ui section divider"><span>Now</span></div>
                    <span className="skycon-main"><Skycon icon={currentForecast.icon}/></span>
                    <span className="temperature-main">{this.floorTemp(currentForecast.temperature)}</span>
                    <span className="summary-main">{currentForecast.summary}</span>
                    <span className="feelslike-main">Feels like {this.floorTemp(currentForecast.apparentTemperature)}</span>
                </div>
                <div className="column center aligned">
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
                    <span className="nexthour-main">Next hour: {nextHourForecast.summary}</span>
                </div>
                <div className="column center aligned">
                    <div className="ui section divider">Today</div>
                    <span className="skycon-main"><Skycon icon={todayForecast.icon}/></span>
                    <span className="temperature-main">{this.floorTemp(todayForecast.temperatureMax)}<span>/</span>{this.floorTemp(todayForecast.temperatureMin)}</span>
                    <span className="summary-main">{todayForecast.summary}</span>
                    <span className="feelslike-main">Feels like {this.floorTemp(todayForecast.apparentTemperatureMax)}/{this.floorTemp(todayForecast.apparentTemperatureMin)}</span>
                </div>
                <div className="column center aligned">
                    <div className="ui large horizontal divided list">
                        <div className="item">
                            <div className="content">
                                <div className="header">Humidity: {todayForecast.humidity}</div>
                            </div>
                        </div>
                            <div className="item">
                                <div className="content">
                                     <div className="header">Windspeed: {todayForecast.windSpeed}</div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="content">
                                    <div className="header">Precib: {todayForecast.precipProbability}</div>
                                </div>
                            </div>
                    </div>
                </div>
                
            </div>
        );
    }
});

module.exports = ForecastPresentation;