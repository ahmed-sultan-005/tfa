import React, { Component } from 'react';

export default class SocialLinks extends Component {
  render() {
    return (
      <ul className="list-inline">
        <li className="social-link">
          <a href="#">
            <img src="/images/landing/icon-facebook.svg" />
          </a>
        </li>
        <li className="social-link">
          <a href="#">
            <img src="/images/landing/icon-twitter.svg" />
          </a>
        </li>
        <li className="social-link">
          <a href="#">
            <img src="/images/landing/icon-google_plus.svg" />
          </a>
        </li>
        <li className="social-link">
          <a href="#">
            <img src="/images/landing/icon-instagram.svg" />
          </a>
        </li>
        <li className="social-link">
          <a href="#">
            <img src="/images/landing/icon-youtube.svg" />
          </a>
        </li>
        <li className="social-link">
          <a href="#">
            <img src="/images/landing/icon-linkedin.svg" />
          </a>
        </li>
      </ul>
    )
  }
}
