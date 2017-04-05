const React = require('react');
const WeekWeather = require('WeekWeather');
const ErrorModal = require('ErrorModal');
const CurrentWeather = require('CurrentWeather')
const WeatherApi = require('WeatherApi');
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

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
  render: function () {
    let {isLoading, forecast, errorMessage, timeZone} = this.state;
    
    function renderWeather () {
      if (isLoading) {
        return <div className="ui active inverted dimmer">
          <div className="ui indeterminate large active text loader">Fetching weather...</div>
        </div>
      } else if (forecast) {
        return (
          
            <div className="ui grid" key={1}>
              <div className="row one column centered unpadded" key={2}>
                <CurrentWeather key={3} currentForecast={forecast.currently} todayDate={forecast.daily.data[0].time} timeZone={timeZone} todayWeather={forecast.daily.data[0]} />
                <WeekWeather key={4} weekForecast={forecast.daily} timeZone={timeZone} hourly={forecast.hourly.data} />
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
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={100}>
        {renderWeather()}
        {renderError()}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
});

module.exports = Weather;

