const React = require('react');

const Time = React.createClass({
        getInitialState: function() {
            return {
                timezone: this.props.timezone
            }
        },
        mountDate: function() {
            let time = new Date();
            let months = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            // time = time.toLocaleString([], {timeZone: this.props.timezone});
            this.setState ({
                seconds: time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds(),
                minutes: time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes(),
                hours: time.getHours() < 10 ? '0' + time.getHours() : time.getHours(),
                month: months[time.getMonth() + 1],
                day: time.getUTCDay()
            });
        },
        componentDidMount: function(){
            this.mountDate();
            setInterval(() => {
                this.mountDate()
            }, 1000)
        },
        render: function() {
            let {seconds, minutes, hours, month, day} = this.state;
            return (
                <span className="time" id="main-time">{`${hours}:${minutes}:${seconds}`}</span>
            );
        }
});

module.exports = Time;