const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');

const ErrorModal = React.createClass({
  getDefaultProps: function () {
    return {
      title: 'Error'
    };
  },
  propTypes: {
      title: React.PropTypes.string,
      message: React.PropTypes.string.isRequired,
      onDismiss:React.PropTypes.func.isRequired
  },
  // componentDidMount: function () {
  //   var {title, message} = this.props;
  //   var modalMarkup = (
  //     <div id="error-modal" className="reveal tiny text-center" data-reveal="">
  //       <h4>{title}</h4>
  //       <p>{message}</p>
  //       <p>
  //         <button className="button hollow" data-close="">
  //           Okay
  //         </button>
  //       </p>
  //     </div>
  //   );

  //   var $modal = $(ReactDOMServer.renderToString(modalMarkup));
  //   $(ReactDOM.findDOMNode(this)).html($modal);

  //   var modal = new Foundation.Reveal($('#error-modal'));
  //   modal.open();
  // },
  render: function () {
  	var {title, message, onDismiss} = this.props;
    return (
      <div className="reveal-overlay" style={{"display": "block"}}>
        <div className="reveal tiny text-center" style={{"display": "block", "top": 233}}>
          <h4>{title}</h4>
          <p>{message}</p>
          <p>
            <button className="button hollow" onClick={onDismiss}>
              Okay
            </button>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = ErrorModal;