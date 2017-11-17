import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import React from 'react';
import { mount } from 'react-mounter';

// containers
import AppContainer from '../../../ui/containers/AppContainer';
import SearchContainer from '../../../ui/containers/SearchContainer';

//pages
import Dashboard from '../../../ui/pages/Dashboard.jsx';
import About from '../../../ui/pages/About.jsx';
import ContactUs from '../../../ui/pages/ContactUs.jsx';

FlowRouter.route('/dashboard', {
  action() {
    mount(AppContainer, {
      yield: <Dashboard />
    })
  },
});

FlowRouter.route('/about', {
  action() {
    mount(AppContainer, {
      yield: <About />
    })
  },
});

FlowRouter.route('/contact_us', {
  action() {
    mount(AppContainer, {
      yield: <ContactUs />
    })
  },
});

// search churches
FlowRouter.route('/search', {
  action(params, queryParams) {
    mount(AppContainer, {
      yield: <SearchContainer params={queryParams} />
    })
  },
});
