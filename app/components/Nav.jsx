const React = require('react');
const {Link, IndexLink} = require('react-router');

const Nav = React.createClass({
  onSearch: function (e) {
      e.preventDefault();
      let location = this.refs.search.value;
      let encodedLocation = encodeURIComponent(location);
      if(location.length > 0) {
        this.refs.search.value = "";
        window.location.hash = "#/weather?location=" + encodedLocation;
      }
      
  },
  render: function () {
    return (
        <div className="ui pointing menu">
            <div className="ui category search item" id="search-box">
              <div className="ui transparent icon input">
                <form onSubmit={this.onSearch}>
                  <input className="prompt" type="search" placeholder="Search weather by city" ref="search" />
                  <i className="search link icon"></i>
                </form>
              </div>
            </div>
          </div>
    );
  }
});

module.exports = Nav;

{/**/}