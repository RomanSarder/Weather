const React = require('react');
const WeatherForm = require('WeatherForm');
const WeatherMessage = require('WeatherMessage');
const ErrorModal = require('ErrorModal');
const openWeatherMap = require('openWeatherMap');

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

    openWeatherMap.getOne(location).then((fetched) => {
      this.setState({
        forecast: fetched,
        isLoading: false
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
  render: function () {
    let {isLoading, forecast, errorMessage} = this.state;
    let self = this;

    function renderMessage () {
      if (isLoading) {
        return <h3 className="text-center">Fetching weather...</h3>;
      } else if (forecast) {
        return <WeatherMessage currentForecast={forecast.currently} nextHourForecast={forecast.hourly.data[0]} weekForecast={forecast.daily} timezone={forecast.timezone}/>;
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