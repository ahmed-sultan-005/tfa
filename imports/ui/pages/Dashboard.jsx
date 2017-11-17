import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { NotificationManager } from 'react-notifications';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    //binding functions
    autoBind(this);
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Dashboard</h1>
      </div>
    );
  }
};
