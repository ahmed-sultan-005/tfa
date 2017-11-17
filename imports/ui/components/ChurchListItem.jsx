import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

export default class ChurchListItem extends Component {

  render() {
    const { church } = this.props;
    let service;
    service = <a href={"/churches/new/"+church.id} className="button hollow small church-register">Request Access</a>;
    if (church.claimed) {
      service = <span className="church-service-times"><span className="church-service-time">Sunday 9:00am</span>(Worship)</span>;
    }

    return (
      <div className="church-search-entry slide_church">
        <div className="church-thumbnail" style={{background: `url(${church.image_url}) top center no-repeat`}}>
          <div className="church-index-number">{this.props.index + 1}</div>
          <img className="church-size" src="/images/size-0.png"/>
        </div>

        <div className="church-details">
          <div className="church-details-top clearfix">
            <div className="row">
              <div className="columns">
                <span className="church-name">{church.name}</span>
              </div>
              <div className="columns shrink church-distance">
                {Number(church.distance / 1610).toFixed(2)} mi
              </div>
            </div>
          </div>

          <div className="church-details-mid">
            <div className="row">
              <div className={"columns church-description " + (church.claimed ? "registered" : "unregistered") }>
                This church has not completed a profile. If you are a staff member & <br />
                would like to claim this profile, request access here.
              </div>
            </div>
          </div>

          <div className="church-details-bot">
            <div className="row">
              <div className="columns">
                <div className="church-address">{church.location ? church.location.address1+", "+ church.location.city : undefined}</div>
              </div>
              <div className="columns shrink">
                {service}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
