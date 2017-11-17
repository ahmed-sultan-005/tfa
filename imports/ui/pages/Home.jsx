import React, { Component } from 'react';

import SocialLinks from '../components/SocialLinks.jsx';
import SignUp from '../components/SignUp.jsx';

export default class Home extends Component {
  render() {
    const { churches } = this.props;


    return (
      <div className="landing">
        <div className="hero-container">
          <div className="row">
            <div className="container small-12">
              <div className="icon pull-left" style={styles.play}><i className="fa fa-play pull-right" style={styles.play.icon} ></i>
              </div>
              <ul className="claims">
                <li>
                  <span className="big">Find.</span>
                  <span className="big">Connect.</span>
                  <span className="big">Worship</span>
                </li>
              </ul>
              <p style={styles.header.earlyAccess}>Get Limited Early Access</p>
              <form>
                <input type="text" className="homeSliderInput" placeholder="Enter Email Address" />
                <input type="submit" className="hidden" />
              </form>
            </div>
            <div className="container small-12 text-center medium-text-right">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="filter_main">
          <div className="filter_inner">
            <span className="fa fa-search" ></span>
            <input type="text" placeholder="Search by Name or Keyword"/>
            <span className="fa fa-list" ></span>
          </div>
        </div>

        <div className="container">
          <h2 style={styles.nearChurchCount}><span className="graybg_span">112 churches</span> Within <span className="graybg_span">30 miles</span> of <span className="graybg_span">94112</span>
            </h2>
          <h3>Nearest churches here</h3>
          <p>{churches ? churches.length : 0}</p>
        </div>

        <div className="container primary-bg">
          <div className="row" style={styles.container}>
            <div className="medium-4 columns hide-for-small-only">
              <img src="/images/landing/phone-profile.png" alt="Phone profile" />
            </div>
            <div className="medium-8 columns">
              <h2>Extend your church beyond the sanctuary and into the hands of thousands!</h2>

              <strong>YOUR ENTIRE CHURCH RIGHT HERE</strong>
              <br/>
              <p>
                Your church is so much more than a building.It’s a living breathing organization with so much to showcase.
                With your custom profile on The Fellowship App you can do just that and so much more.
              </p>
              <strong>WORSHIP ON-DEMAND</strong>
              <p>
                Worship isn’t just on Sunday or in the confines of the sanctuary.Allow people to stream your live service
                and
                past sermons whenever they like from anywhere in the world.
              </p>
              <div className="text-center medium-text-left">
                <img src="/images/landing/Sermons.png" alt="Sermons" />
              </div>
            </div>
          </div>
        </div>
        <div className="container bg-lightgrey nopad-bottom">
          <div className="row" style={{padding: "0.9375rem", paddingBottom:0}}>
            <div className="row medium-7 columns align-bottom">
              <h1>Be found by aspiring worshippers everywhere!</h1>
              <p>
                Stop spending hundreds or even thousands on ineffective advertising.Place your church directly in the palms
                of
                people who need you most.
              </p>
              <div className="row">
                <div className="large-6 columns">
                  <strong>SMART FILTERS</strong>
                  <p>
                    Every church is unique and we want people to be able to search what makes them special.From denomination
                    to service times and amenities we help people find the church that fits them best.
                  </p>
                  <strong>SEE WHAT’S IN YOUR AREA.ANYWHERE</strong>
                  <p>
                    Find a place to worship close to where you are, wether you have been there for a few years, just moved to
                    a
                    new area or are traveling over the weekend.It’s all right in your hand.
                  </p>
                </div>
                <div className="large-6 columns show-for-large align-top text-right">
                  <img src="/images/landing/phone-filter.png" alt="Phone filter" />
                </div>
              </div>
            </div>
            <div className="medium-5 columns hide-for-small-only">
              <img src="/images/landing/phone-listing-after-filter.png" alt="Phone listing" />
            </div>
          </div>
        </div>
        <div className="bg-darkgrey">
          <div className="container nopad-bottom">
            <div className="row">
              <div className="small-12 medium-4 columns align-bottom text-center medium-text-left">
                <img src="/images/landing/phone-tide.png" alt="Phone tide" />
              </div>
              <div className="small-12 medium-8 columns">
                <h1>Save time, save money.Take your giving to the next level.</h1>
                <strong>NO CASH, NO PROBLEM!</strong>
                <br/>
                <p>
                  Passing around an offering plate is great, if all your members carry hundreds in cash or still have a
                  leftover check.The digital age requires digital payments that can tracked, managed, and processed instantly.
                  Oh ye, from anywhere!
                </p>
                <strong>TAX SEASON, SHMAX SEASON</strong>
                <p>
                  The bigger your church the harder it is to keep track of individual giving come tax season.Well, The
                  Fellowship App makes it as breeze.We keep track of all your donations automatically and send you a simple
                  spreadsheet at the end of the year.You’re welcome Finance Ministry.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={styles.infoContainer}>
          <div className="row" style={styles.infoRow}>
            <figure className="text-center callout medium-4 small-12 columns">
              <img src="/images/landing/icon-callout-calendar.png" alt="Icon callout calendar" />
              <figcaption>
                <p>
                  <strong className="text-uppercase">SYNCHRONIZED CALENDAR</strong>
                </p>
                <p>
                  Synchronized Calendar makes it easy for your church to create events, sell tickets, and share RSVPs with
                  your congregation and the general public.
                </p>
              </figcaption>
            </figure>
            <figure className="text-center callout medium-4 small-12 columns">
              <img src="/images/landing/icon-callout-convo.png" alt="Icon callout convo" />
              <figcaption>
                <p>
                  <strong className="text-uppercase">DIRECT MESSAGING</strong>
                </p>
                <p>
                  Direct Messaging with Push Notifications allows you to keep in touch with your congregation outside of
                  church and assist them with questions right when they need it.
                </p>
              </figcaption>
            </figure>
            <figure className="text-center callout medium-4 small-12 columns">
              <img src="/images/landing/icon-callout-notes.png" alt="Icon callout notes" />
              <figcaption>
                <p>
                  <strong className="text-uppercase">NOTES &amp; BOOKMARKS</strong>
                </p>
                <p>
                  Bookmarks &amp; Notes allows worshippers to save churches, events, and take sermon notes in one easy
                  location.Bookmarks &amp; notes can be shared instantly with friends.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>

        <SignUp />
      </div>
    )
  }
}

Home.propTypes = {
  churches: React.PropTypes.array
}

const styles = {
  infoContainer: {
    padding: 0
  },
  infoRow: {
    maxWidth: "100%",
    margin: 0
  },
  header: {
    earlyAccess: {
      marginBottom: "20px",
      fontSize: "18px",
      fontFamily: 'Helvetica',
      textAlign: "center",
      color: "white",
      fontWeight: "lighter"
    }
  },
  play: {
    width: "100%",
    icon: {
      fontSize: "40px",
      marginBottom: "40px",
      color: "white"
    }
  },
  nearChurchCount: {
    fontSize: "17px",
    textAlign: "center"
  },
  container: {
    paddingLeft: "1.5625rem",
    paddingRight: "1.5625rem"
  }
}
