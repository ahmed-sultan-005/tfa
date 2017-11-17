import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ShowChurch from '../pages/churches/Show.jsx';

import { Churches } from '../../api/churches/churches.js';
import { Transactions } from '../../api/transactions/transactions.js';

export default ShowChurchContainer = createContainer(props => {
  const { id } = props;

  let transactionHandle , transactions = [];

  const churchHandle = Meteor.subscribe("churches.show", id);
  let church = churchHandle.ready() ? Churches.findOne() : {};

  if (church) {
    if (church.claimerId == Meteor.userId()) {
      transactionHandle = Meteor.subscribe("transactions.church",church._id);
      transactions =   transactionHandle.ready() ? Transactions.find({churchId: church._id}).fetch() : []
    } else {
      transactionHandle = Meteor.subscribe("transactions.church.user",church._id);
      transactions =   transactionHandle.ready() ? Transactions.find({churchId: church._id, createdBy: Meteor.userId()} ).fetch() : []
    }
  }

  return {
    church: church ,
    churchTransactions: transactions
  };
}, ShowChurch);

