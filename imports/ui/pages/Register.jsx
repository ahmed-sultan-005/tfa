import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { NotificationManager } from 'react-notifications';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    //binding functions
    autoBind(this);
  }

  onChange(event) {
    this.state[event.target.id] = event.target.value;
  }

  handleRegistration(event) {

    if (!this.state.email) { NotificationManager.error("Email is required"); return;}
    if (!this.state.password) { NotificationManager.error("Password is required"); return;}
    if (!this.state.confirmPassword) { NotificationManager.error("Confirm Password is required"); return;}
    if (this.state.password != this.state.confirmPassword) { NotificationManager.error("Password mismatch"); return;}

    // create user account
    Meteor.call("usersRegister", this.state, (err, result) => {
      if (err) {
        NotificationManager.error(err.message);
      } else {
        NotificationManager.success("Account created successfully!");
        FlowRouter.go("/login");
      }
    });

  }

  render() {
    return (
      <div className="landing-contact establishment-register">
        <div className="hero-container">
          <h2 className="text-center">
            The best investment your Church will ever make!
          </h2>
        </div>
        <div className="container container-overlay">
          <div className="row">
            <div className="small-12">
              <h3 className="text-center" style={{marginBottom: 0}}>Register!</h3>
              <p className="text-center" style={{marginTop: 0}}>Please fill out the form below.</p>

              <div className="row" style={{marginTop: "4em"}}>
                <div className="small-12 medium-12 column text-center medium-text-left">
                  <input type="email" id="email" placeholder="Email*" required value={this.state.email} onChange={this.onChange}  />
                </div>
              </div>

              <div className="row">
                <div className="small-12 medium-12 column text-center medium-text-left">
                  <input type="password" id="password" placeholder="Password*" required value={this.state.passwrod} onChange={this.onChange} />
                </div>
              </div>

              <div className="row">
                <div className="small-12 medium-12 column text-center medium-text-left">
                  <input type="password" id="confirmPassword" placeholder="Confirm Password*" required value={this.state.confirmPasswrod} onChange={this.onChange} />
                </div>
              </div>

              <div className="row">
                <div className="small-6 medium-6 column text-center medium-text-left">
                  <a href="/login">Already a member?</a>
                </div>
                <div className="small-6  medium-6 column text-center medium-text-right">
                  <button className="button success" onClick={this.handleRegistration}>Register</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
};
