const React = require('react');
const Skycon = require('Skycon');

const ForecastPresentation = React.createClass({
    floorTemp: function(temperature) {
        return temperature > 0 ? `+${Math.floor(temperature)}` : Math.floor(temperature); 
    },
    render: function() {
        let {todayForecast} = this.props;
        return(
                <div className="column center aligned">
                    <div className="ui section divider">Today</div>
                    <span className="skycon-main"><Skycon icon={todayForecast.icon}/></span>
                    <span className="temperature-main">{this.floorTemp(todayForecast.temperatureMax)}&nbsp;°<span className="temperature-min">{this.floorTemp(todayForecast.temperatureMin)}&nbsp;°</span></span>
                    <span className="summary-main">{todayForecast.summary}</span>
                    <span className="feelslike-main">Feels like {this.floorTemp(todayForecast.apparentTemperatureMax)}&nbsp;°<span className="temperature-min">{this.floorTemp(todayForecast.apparentTemperatureMin)}&nbsp;°</span></span>
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
        );
    }
});

module.exports = ForecastPresentation;