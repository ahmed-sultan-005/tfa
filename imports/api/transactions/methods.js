import { Meteor } from 'meteor/meteor';
import braintree from 'braintree';

import { Transactions } from './transactions.js';
import { Payments } from '../payments/payments.js';

import PaymentStatus from '../payments/enums/status.js';
import { generateInvoiceNumber } from '../../startup/both/global-methods.js'


const Gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: Meteor.settings.private.braintree.merchantId,
  publicKey: Meteor.settings.private.braintree.publicKey,
  privateKey: Meteor.settings.private.braintree.privateKey
});

Meteor.methods({
  'transactions.braintree.new'(arguments) {

    check(arguments,Object);
    // https://developers.braintreepayments.com/reference/response/transaction/node#result-object

    const { paymentId } = arguments;
    const payment = Payments.findOne({_id: paymentId })
    Gateway.transaction.sale({
      amount: arguments.amount,
      paymentMethodNonce: arguments.nonce,
      recurring: arguments.recurring,
      orderId: generateInvoiceNumber() +"-"+payment.churchId,
      customer: {
        email: Meteor.user().emails[0].address
      }
    }, Meteor.bindEnvironment(function(err, result) {
      if (err) {
        console.log(err);
      } else {
        let user = Meteor.users.findOne({ _id: payment.userId });
        if (result.success) {
          Transactions.insert({
            paymentId: paymentId,
            churchId: payment.churchId,
            response: result
          });

          Payments.update({ _id: paymentId }, {
            $set: {
              status: PaymentStatus.paid
            }
          });

        } else {

          Payments.update({ _id: paymentId }, {
            $set: {
              status: PaymentStatus.failed
            }
          });
        }
      }
    }));
  }
});
