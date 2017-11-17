import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Geosuggest from 'react-geosuggest';
import { NotificationManager } from 'react-notifications';
import { Geolocation } from 'meteor/mdg:geolocation';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    //binding function
    autoBind(this);
  }

  searchChurch(e) {
    if (e.which == 13) {
      $("#searchChurchForm").submit();
    }
  }

  handleLocation(suggest) {
    this.setState({ location: suggest.label });
  }

  logout() {
    Meteor.logout();
    NotificationManager.success("Logout successfully!");
    FlowRouter.go("/");
  }

  render() {
    const { params } = this.props;

    return (
      <div className='title-wrapper'>
        <div className='row title-row'>
          <div className='title-bar small-12 hide-for-large' data-hide-for='large' data-responsive-toggle='dropdown-menu'>
            <div className='title-bar-left'>
              <a href="/" className='title-brand'><img src="/images/tfa.png"style={styles.title} /></a>
            </div>
            <div className='title-bar-right'>
              <button className='menu-icon'></button>
              <ul id='dropdown-menu'>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact_us">Contact Us</a></li>
                 {!Meteor.userId() &&
                  <li><a href="/register" className="button register_button primary-button">Sign Up</a></li>
                }
                { Meteor.userId() &&
                  <li><a href="#" onClick={this.logout} className= "primary-button button register_button"> Logout</a></li>
                }
              </ul>
            </div>
          </div>
          <div className='top-bar show-for-large small-12' id='desktop-menu' style={{padding: 0 ,marginLeft: "6px"}}>
            <div className='top-bar-left'>
              <a href="/" className='title-brand'><img src="/images/tfa.png" style={styles.title} /></a>
              <form id="searchChurchForm" action="/search" style={styles.searchForm}>
                {/*<i className="fa fa-location-arrow" style={styles.locationIcon}></i>*/}
                <Geosuggest
                  id="locationText"
                  name="locationText"
                  placeholder="Near by"
                  initialValue={this.state.location || (params && params.locationText ? params.locationText : undefined)}
                  onSuggestSelect={this.handleLocation}
                />
                {/*<i className="fa fa-search" style={styles.searchIcon}></i>*/}
                <input type="text" style={styles.search} id="churchText" name="churchText" autoComplete="off" placeholder="Search Church by Name" onKeyPress={this.searchChurch} onChange={this.searchChurch} value={params && params.churchText ? params.churchText : undefined} />
              </form>
            </div>
            <div className='top-bar-right'>
              <ul className="menu">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact_us">Contact Us</a></li>
                {!Meteor.userId() &&
                  <li><a href="/register" className="button register_button primary-button">Sign Up</a></li>
                }
                { Meteor.userId() &&
                  <li><a href="#" onClick={this.logout} className= "primary-button button register_button"> Logout</a></li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  searchForm: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    margin: 5,
    float: 'left',
    paddingLeft: "7%"
  },
  search: {
    padding: "18px 32px",
    margin: "1px 0px 0px 10px",
    display: "inline-block",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
    width: "244px"
  },
  title: {
    width: "51px",
    height: "51px"
  },
  locationIcon: {
    position: "absolute",
    paddingLeft: "272px",
    zIndex: "55"
  },
  searchIcon: {
    position: "absolute",
    paddingLeft: "11px"
  }
}
