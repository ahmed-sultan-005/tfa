import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';

import React from 'react';
import { mount } from 'react-mounter';

// containers
import AppContainer from '../../../ui/containers/AppContainer';
import ChurchContainer from '../../../ui/containers/ChurchContainer';
import ShowChurchContainer from '../../../ui/containers/ShowChurchContainer';

//pages

let churchesRoutes = FlowRouter.group({
  prefix: '/churches',
  name: "churches"
});

churchesRoutes.route('/new/:id', {
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      Session.set('lastPath', context.path);
      redirect("/login");
    }

  }],
  action(params, queryParams) {
    mount(AppContainer, {
      yield: <ChurchContainer id={params.id} />
    })
  },
});

churchesRoutes.route('/:id', {
  action(params, queryParams) {
    mount(AppContainer, {
      yield: <ShowChurchContainer id={params.id} />
    })
  },
});

