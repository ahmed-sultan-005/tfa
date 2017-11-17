import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import SocialLinks from './SocialLinks.jsx';

export default class Footer extends Component {
  render() {
    let signUpBtn;

    if (!Meteor.userId()) {
      signUpBtn = (
        <li>
          <a href="/register" className="button primary-button">Sign Up</a>
        </li>
      );
    }

    return (
      <div className='container bg-blue footer'>
        <div className='row'>
          <div className='small-12 large-6 text-center large-text-left'>
            <ul className="menu">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact_us">Contact Us</a></li>
              {signUpBtn}
            </ul>
          </div>
         <MediaQuery minDeviceWidth={600}>
          <div className='small-12 large-6' style= {{paddingLeft: "164px"}}>
            <SocialLinks />
          </div>
         </MediaQuery>
        </div>
        <div className="full row">
          <div className="columns medium-6 l">
            Copyright © 2016 The Fellowship App. All Rights Reserved.
          </div>
          <div className="columns medium-6 r">
            We value your privacy. None of the details supplied will be shared with external parties
          </div>
        </div>
      </div>
    );
  }
}
