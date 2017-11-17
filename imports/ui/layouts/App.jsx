import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

// App component - represents the whole app
export default class App extends Component {
  render() {

    return (
      <div>
        <Header params={this.props.yield.props ? this.props.yield.props.params : null} />
        {this.props.yield}
        {FlowRouter.current().path.indexOf("/search") == -1  &&
          <Footer />
        }
        <NotificationContainer />
      </div>
    );
  }
}
