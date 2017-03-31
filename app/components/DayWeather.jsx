const React = require('react');
const Skycon = require('Skycon');
const moment = require('moment-timezone');
const DayWeather = React.createClass({
    render: function() {
        let {temperatureMax, temperatureMin, summary, icon, time} = this.props.forecast;
        let {timeZone} = this.props;
        let dateInfo = moment(time * 1000).tz(timeZone);
        let date = dateInfo.date();
        let month = dateInfo.format('MMMM');
        let day = dateInfo.format('dddd');
        day = day[0].toUpperCase() + day.slice(1);
        temperatureMax = temperatureMax < 0 ? Math.round(temperatureMax) : '+' + Math.round(temperatureMax)
        temperatureMin = temperatureMin < 0 ? Math.round(temperatureMin) : '+' + Math.round(temperatureMin)
        return (
            <div className="column ui segment">
                <div className="row one column">
                    <div className="column">
                        <div className="row one column">
                            <div className="column">
                                <span className="day-week">{day}</span>
                                <span className="date">{date} {month}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row one column">
                        <div className="column">
                            <span className="day-icon"><Skycon className="icon-day" color='#99663C' icon={icon === 'partly-cloudy-night' ? 'clear-day' : icon} /></span>
                            <span className="temperatureMax-day">{temperatureMax}&nbsp;°</span>
                            <span className="temperatureMin-day">{temperatureMin}&nbsp;°</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DayWeather