import { Meteor } from 'meteor/meteor';
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// app container
import AppContainer from '../../../ui/containers/AppContainer.jsx';

//pages
import Login from '../../../ui/pages/Login.jsx';
import Register from '../../../ui/pages/Register.jsx';
import ChangePassword from '../../../ui/pages/ChangePassword.jsx';
import ForgotPassword from '../../../ui/pages/ForgotPassword.jsx';

FlowRouter.route('/login', {
  name: "Accounts.login",
  triggersEnter: [function(context, redirect) {
    if (Meteor.userId()) {
      redirect("/dashboard");
    }
  }],
  action() {
    // Render login page here
    mount(AppContainer, {
      yield: <Login />
    });
  },
});

FlowRouter.route('/register', {
  name: "Accounts.register",
  triggersEnter: [function(context, redirect) {
    if (Meteor.userId()) {
      FlowRouter.go("/dashboard");
    }
  }],
  action() {
    // Render register page here
    mount(AppContainer, {
      yield: <Register />
    });
  },
});

FlowRouter.route('/forgot-password', {
  name: "Accounts.forgotPassword",
  triggersEnter: [function(context, redirect) {
    if (Meteor.userId()) {
      FlowRouter.go("/dashboard");
    }
  }],
  action() {
    // Render forgot password page here
    mount(AppContainer, {
      yield: <ForgotPassword />
    });
  },
});

FlowRouter.route('/change-password', {
  name: "Accounts.changePassword",
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      FlowRouter.go("/login");
    }
  }],
  action() {
    // Render change password page here
    mount(AppContainer, {
      yield: <ChangePassword />
    });
  },
});
