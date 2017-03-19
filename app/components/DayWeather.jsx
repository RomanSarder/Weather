const React = require('react');
const Skycon = require('Skycon');

const DayWeather = React.createClass({
    render: function() {
        let {temperatureMax, temperatureMin, summary, icon} = this.props.forecast;
        temperatureMax = temperatureMax < 0 ? Math.floor(temperatureMax) : '+' + Math.floor(temperatureMax)
        temperatureMin = temperatureMin < 0 ? Math.floor(temperatureMin) : '+' + Math.floor(temperatureMin)
        return (
            <div className="column ui segment">
                <div className="row one column">
                    <div className="column">
                        <span className="temperature-day">{`${temperatureMax} / ${temperatureMin}`}</span>
                    </div>
                </div>
                <div className="row one column">
                    <div className="column">
                        <Skycon className="icon-day" icon={icon === 'partly-cloudy-night' ? 'clear-day' : icon}/>
                    </div>
                    <div className="column">
                        <span className="day-summary">{summary === 'Partly cloudy overnight.' ? 'Clear throughout the day.' : summary}</span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DayWeather