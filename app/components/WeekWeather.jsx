const React = require('react');
const Skycon = require('Skycon');
const Time = require('Time');
const DayWeather = require('DayWeather');

const WeekWeather = React.createClass({
	getInitialState: function() {
		return {
			activeIndex: undefined
		}
	},
	handleClick: function(count) {
		let nextWeekForecast = this.props.weekForecast.data.slice(1, this.props.weekForecast.length);
		this.setState({activeIndex: count});
		this.props.handleClick(nextWeekForecast[count]);
	},
	render: function() {
		let {weekForecast, timeZone} = this.props;
		let nextWeekForecast = weekForecast.data.slice(1, weekForecast.length);
		let key = 0;
		let count = 0;
		return(
				<div className="row one column" id="week-block">
					<div className="column">
						<div className="ui grid seven column doubling" id="week-list">
							{nextWeekForecast.map((day) => {
								return <DayWeather forecast={day} key={key++} count={count++} handleClick={this.handleClick} isActive={this.state.activeIndex === count-1} timeZone={timeZone}/>
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