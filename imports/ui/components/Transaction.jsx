import React, { Component } from 'react';
import autoBind from 'react-autobind';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { capitalize } from '../../startup/both/global-methods.js';

export default class Payments extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    //binding function
    autoBind(this);
  }

  render(){

    const { transaction } = this.props;
    let createdAt = moment(transaction.createdAt).format("DD-MM-YYYY").toString();
    let user = Meteor.users.findOne({ _id: transaction.createdBy });
    return(
      <tr style={styles.tableRow}>
        <td> {capitalize(transaction.response.transaction.creditCard.cardholderName)}</td>
        <td>{transaction.response.transaction.customer.email}  </td>
        <td> {transaction.response.transaction.orderId}</td>
        <td>${transaction.response.transaction.amount}</td>
        <td>{capitalize(transaction.response.transaction.status)}</td>
        <td>{ createdAt }</td>
      </tr>
    );
  }
}
const styles = {
  tableRow: {
    background: "white",
    color: "black"
  }
}
