const React = require('react');
const Skycon = require('Skycon');
const Time = require('Time');
const DayWeather = require('DayWeather');
const moment = require('moment-timezone');

const WeekWeather = React.createClass({
	getInitialState: function() {
		return {
			activeIndex: undefined
		}
	},
	insertHours: function(daily, hourly, timezone) {
		daily.forEach((day) => {
			day.hourly = [];
			let dayOfWeek = moment(day.time * 1000).tz(timezone).format('dddd');
			hourly.forEach((hour) => {
				let hourDay = moment(hour.time * 1000).tz(timezone).format('dddd')
				if (dayOfWeek === hourDay) {
					day.hourly.push(hour);
				}

			})
		})
		return daily;
	},
	render: function() {
		let {weekForecast, timeZone, hourly} = this.props;
		
		// Define today's day
		// Delete last day from hourly object
		let today = moment().tz(timeZone);
		let sliced = hourly.slice(0, hourly.length - today.hour() - 1);
		
		// Delete current day data and this day after week date
		let nextWeekForecast = weekForecast.data.slice(1, weekForecast.length);
		nextWeekForecast.splice(-1, 1);

		this.insertHours(nextWeekForecast, sliced, timeZone);
		let key = 0;
		return(
				<div className="row one column" id="week-block">
					<div className="column">
						<div className="ui grid six column doubling" id="week-list">
							{nextWeekForecast.map((day) => {
								return <DayWeather forecast={day} key={key++} timeZone={timeZone}/>
							} )}
						</div>
					</div>
				</div>
		);		
	}
})

module.exports = WeekWeather;
{/*<div className="ui grid one column container centered">
				<div className="row one column">
					<div className="column">
						<div className="segment basic ui" id="header-container-main">
							<h2 className="ui center aligned header">{`${currentForecast.city}, ${currentForecast.country}`} <Time/></h2>
						</div>
						<div className="ui grid centered doubling">
							<div className="row one column" id="main-info-block">
								<div className="column" id="title-container-main">
									<span className="currently">
										<span className="skycon">
											<Skycon icon={currentForecast.icon} />
										</span>
										<span className="temperature-main">{currentForecast.temperature < 0 ? Math.floor(currentForecast.temperature) : '+' + Math.floor(currentForecast.temperature)}</span>
										<span className="summary-main">Partly Clodly throughout the day</span>
									</span>
									<span id="day-summary-main">{thisDayForecast.summary}</span>
									<span id="next-hour-info-main">Next hour: {nextHourForecast.summary}</span>
								</div>
							</div>
							<div className="row three columns" id="additional-info-main">
								<div className="column">
									<div className="ui basic segment">Humidity: {currentForecast.humidity}</div>						
								</div>
								<div className="column">
									<div className="ui basic segment">Rain: {currentForecast.precipProbability} </div>
								</div>
								<div className="column">
									<div className="ui basic segment">Wind speed: {currentForecast.windSpeed}</div>
								</div>							
							</div>						
						</div>
					</div>
				</div>*/}