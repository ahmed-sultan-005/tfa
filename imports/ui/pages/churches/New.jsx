import { FlowRouter } from 'meteor/kadira:flow-router';
import React, {Component} from 'react';
import autoBind from 'react-autobind';
import { Churches } from '../../../api/churches/churches.js';

import { NotificationManager } from 'react-notifications';

export default class NewChurch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      location: {
        address: "",
        city: "",
        state: "",
        zipCode: ""
      }
    };

    //binding functions
    autoBind(this);
  }

  onChange(event) {
    this.state[event.target.id] = event.target.value;
  }

  submitForm(event) {

    Meteor.call("updateChurch", this.state, (err, result) => {
      if (err) {
        NotificationManager.error(err.message);
      } else {
        let church = Churches.findOne({_id: result});
        FlowRouter.go('/churches/'+church.yelp.id);
        NotificationManager.success("Updated!");
      }
    });
  }

  componentWillReceiveProps(props) {
    this.setState(props.church);
  }

  render() {
    const { church } = this.props;

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
              <h3 className="text-center" style={{marginBottom: 0}}>Register Your Church Today!</h3>
              <p className="text-center" style={{marginTop: 0}}>Please fill out the form below.</p>

              <div className="row" style={{marginTop: "4em"}}>
                <div className="small-12 medium-6 column text-center medium-text-left">
                  <input type="text" id="name" placeholder="Name*" required value={this.state.name} onChange={this.onChange}  />
                  <span className="form-error">Church name is required</span>
                </div>
                <div className="small-12 medium-6 column text-center medium-text-left">
                  <input type="text" id="denomination" placeholder="Denomination*" required value={this.state.denomination}  onChange={this.onChange} />
                  <span className="form-error">Denomination is required</span>
                </div>
              </div>
              <div className="row">
                <div className="small-12 medium-6 column text-center medium-text-left">
                  <input type="text" id="pastor" placeholder="Pastor full name*" required value={this.state.pastor} onChange={this.onChange} />
                  <span className="form-error">Pastor is required</span>
                </div>
                <div className="small-12 medium-6 column text-center medium-text-left">
                  <input type="text" id="address" placeholder="Address*" required value={this.state.location.address} onChange={this.onChange} />
                  <span className="form-error">Address is required</span>
                </div>
              </div>
              <div className="row">
                <div className="small-12 medium-6 column text-center medium-text-left">
                  <input type="text" id="phone" type="tel" placeholder="Phone number*" required value={this.state.phone} onChange={this.onChange} />
                  <span className="form-error">Phone number is required</span>
                </div>
                <div className="small-12 medium-6 column text-center medium-text-left">
                  <div className="row">
                    <div className="small-6 columns">
                      <input type="text" id="city" placeholder="City*" required disabled value={this.state.location.city} onChange={this.onChange} />
                      <span className="form-error">City is required</span>
                    </div>
                    <div className="small-3 columns">
                      <input type="text" id="state" placeholder="State*" required disabled value={this.state.location.state} onChange={this.onChange} />
                      <span className="form-error">State is required</span>
                    </div>
                    <div className="small-3 columns">
                      <input type="text" id="number" placeholder="Zip*" required disabled value={this.state.location.zipCode} onChange={this.onChange} />
                      <span className="form-error">Zip is required</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="small-12 medium-6 column text-center medium-text-left">
                  <input type="email" id="email" placeholder="Email*" required value={this.state.email} onChange={this.onChange} />
                  <span className="form-error">Name is required</span>
                </div>
                <div className="small-12 medium-6 column text-center medium-text-left">
                  <input type="url" id="website" placeholder="Website" value={this.state.website} onChange={this.onChange} />
                </div>
              </div>
              <div className="row">
                <div className="small-12 text-center medium-text-right">
                  <button className="button success" onClick={this.submitForm}>Submit</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
