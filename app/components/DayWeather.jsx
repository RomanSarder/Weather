const React = require('react');
const Skycon = require('Skycon');

const DayWeather = React.createClass({
    handleClick: function(e) {
        this.props.handleClick(this.props.count);
    },
    render: function() {
        let {temperatureMax, temperatureMin, summary, icon} = this.props.forecast;
        temperatureMax = temperatureMax < 0 ? Math.round(temperatureMax) : '+' + Math.round(temperatureMax)
        temperatureMin = temperatureMin < 0 ? Math.round(temperatureMin) : '+' + Math.round(temperatureMin)
        return (
            <div className={`column ui segment ${this.props.isActive ? "" : 'basic'}`} onClick={this.handleClick}>
                <div className="row one column">
                    <div className="column">
                        <span className="temperatureMax-day">{temperatureMax}&nbsp;°</span>
                        <span className="temperatureMin-day">{temperatureMin}&nbsp;°</span>
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