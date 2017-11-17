import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import React from 'react';
import { mount } from 'react-mounter';

// containers
import AppContainer from '../../../ui/containers/AppContainer';

//pages
import Home from '../../../ui/pages/Home.jsx';
import NotFound from '../../../ui/pages/NotFound.jsx';

FlowRouter.route('/', {
  action() {
    mount(AppContainer, {
      yield: <Home />
    })
  },
});

FlowRouter.notFound = {
  action() {
    mount(AppContainer, {
      yield: <NotFound />
    })
  },
};
