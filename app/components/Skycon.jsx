const React = require('react');
const ReactDOM = require('react-dom');
const Skycons = require('skycons')(window);

const Skycon = React.createClass({
    getInitialState: function() {
        return {
            skycons: new Skycons({'color': this.props.color})    
        }
    },
    propTypes: {
        color: React.PropTypes.string,
        autoplay: React.PropTypes.bool,
        icon: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            color: 'black',
            autoplay: true
        }
    },
    componentDidMount: function() {
        this.state.skycons.set(ReactDOM.findDOMNode(this), this.props.icon);
        if (this.props.autoplay) {
            this.state.skycons.play();
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.state.skycons.set(ReactDOM.findDOMNode(this), nextProps.icon);
    },
    componentWillUnmount: function() {
        this.state.skycons.pause();
        this.state.skycons.remove(ReactDOM.findDOMNode(this));
    },
    play: function() {
        this.state.skycons.play();
    },
    pause: function() {
        this.state.skycons.pause();
    },
    render: function() {
        let props = {};
        const defaultStyle = {
            width: '100%',
            height: '100%'
        };
        for (let prop in this.props) {
            props[prop] = this.props[prop];
        }
        delete props.autoplay;

        return (
            <canvas style={defaultStyle} {...props}/>
        );
    }
})

module.exports = Skycon;