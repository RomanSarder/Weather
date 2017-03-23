const React = require('react');
const WeatherForm = require('WeatherForm');
const WeekWeather = require('WeekWeather');
const ForecastPresentation = require('ForecastPresentation');
const ErrorModal = require('ErrorModal');
const CurrentWeather = require('CurrentWeather')
const WeatherApi = require('WeatherApi');

const Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    }
  },
  handleSearch: function (location) {
    this.setState({
      isLoading: true,
      errorMessage: undefined,
      forecast: undefined
    });

    WeatherApi.getOne(location).then((fetched) => {
      this.setState({
        forecast: fetched,
        isLoading: false,
        display: fetched.daily.data[0],
        timeZone: fetched.timezone
      });
    }, (e) => {
      this.setState({
        isLoading: false,
        errorMessage: e.message
      });
    });
  },
  componentDidMount: function () {
    let location = this.props.location.query.location;
    console.log(this.props.location.query);
    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/weather';
    }
  },
  componentWillReceiveProps: function (newProps) {
    let location = newProps.location.query.location;

    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/weather/';
    }
  },
  handleDisplayChange: function(data) {
      this.setState({display: data, isToday: false});
  },
  render: function () {
    let {isLoading, forecast, errorMessage, display} = this.state;
    let self = this;

    function renderMessage () {
      if (isLoading) {
        return <h3 className="text-center">Fetching weather...</h3>;
      } else if (forecast) {
        return (
          <div className="ui grid container">
            <div className="row one column centered unpadded">
              <CurrentWeather currentForecast={forecast.currently} nextHourForecast={forecast.hourly.data[1]} timeZone={self.state.timeZone} />
              <ForecastPresentation todayForecast={display} timeZone={self.state.timeZone} isToday={self.state.isToday}/>
              <WeekWeather weekForecast={forecast.daily} handleClick={self.handleDisplayChange} timeZone={self.state.timeZone}/> 
            </div>         
          </div>
        );
      }
    }

    function renderError () {
      if (typeof errorMessage === 'string') {
        return (
          <ErrorModal message={errorMessage} onDismiss={() => self.setState({errorMessage: undefined})}/>
        )
      }
    }

    return (
      <div>
        {renderMessage()}
        {renderError()}
      </div>
    )
  }
});

module.exports = Weather;

{/*<h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch}/>*/}