const React = require('react');
const Skycon = require('Skycon');
const moment = require('moment-timezone');
const DayWeather = React.createClass({
    dayTime: function(hourly, timezone) {
        hourly = hourly.filter((hour) => {
            return moment(hour.time * 1000).tz(timezone).hour() === 3 || moment(hour.time * 1000).tz(timezone).hour() === 7 ||moment(hour.time * 1000).tz(timezone).hour() === 15 || moment(hour.time * 1000).tz(timezone).hour() === 21;
        })
        return hourly;
    },
     floorTemp: function(temperature) {
        return temperature > 0 ? `+${Math.round(temperature)}` : Math.round(temperature); 
    },
    render: function() {
        let {temperatureMax, temperatureMin, summary, icon, time, hourly, humidity, windSpeed, windBearing, precipProbability} = this.props.forecast;
        let {timeZone} = this.props;
        let dateInfo = moment(time * 1000).tz(timeZone);
        let date = dateInfo.date();
        let month = dateInfo.format('MMMM');
        let day = dateInfo.format('dddd');
        day = day[0].toUpperCase() + day.slice(1);
        temperatureMax = temperatureMax < 0 ? Math.round(temperatureMax) : '+' + Math.round(temperatureMax)
        temperatureMin = temperatureMin < 0 ? Math.round(temperatureMin) : '+' + Math.round(temperatureMin)
        hourly = this.dayTime(hourly, timeZone);
        let bearing = windSpeed === 0 ? 0 : windBearing
        return (
            <div className="column ui segment">
                <div className="flip">
                    <div className="front">
                        <div className="row one column">
                            <div className="column">
                                <div className="row one column">
                                    <div className="column">
                                        <span className="day-week">{day}</span>
                                        <span className="date">{date} {month}</span>
                                    </div>
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
                    <div className="back">
                        <div className="row one column">
                            <div className="column">
                                <div className="ui header day-summary">{summary}</div>
                                <div className="ui mini horizontal divided list conditions">
                                    <div className="item">
                                        <div className="content">
                                            <div className="header"><i className="wi wi-humidity"></i> {Math.floor(humidity * 100)}%</div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="content">
                                            <div className="header"><i className={`wi wi-wind from-${bearing}-deg`}></i> {windSpeed}mph</div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="content">
                                            <div className="header"><i className="wi wi-umbrella"></i> {Math.floor(precipProbability * 100)}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row one column">
                            <div className="column">
                                <div className="ui small list daytime-list">
                                    <div className="item">
                                        <span className="back-daytime">Night</span>
                                        <span className="back-icon"><Skycon color="#99663C" icon={hourly[0].icon}></Skycon></span>
                                        <span className="back-temp">{this.floorTemp(hourly[0].temperature)}&nbsp;°</span>
                                    </div>
                                    <div className="item">
                                        <span className="back-daytime">Morning</span>
                                        <span className="back-icon"><Skycon color="#99663C" icon={hourly[1].icon}></Skycon></span>
                                        <span className="back-temp">{this.floorTemp(hourly[1].temperature)}&nbsp;°</span>
                                    </div>
                                    <div className="item">
                                        <span className="back-daytime">Day</span>
                                        <span className="back-icon"><Skycon color="#99663C" icon={hourly[2].icon}></Skycon></span>
                                        <span className="back-temp">{this.floorTemp(hourly[2].temperature)}&nbsp;°</span>
                                    </div>
                                    <div className="item">
                                        <span className="back-daytime">Evening</span>
                                        <span className="back-icon"><Skycon color="#99663C" icon={hourly[3].icon}></Skycon></span>
                                        <span className="back-temp">{this.floorTemp(hourly[3].temperature)}&nbsp;°</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DayWeather