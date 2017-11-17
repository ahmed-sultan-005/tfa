import { Meteor } from 'meteor/meteor';
import braintree from 'braintree';
import { Payers } from './payers.js';

const Gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: Meteor.settings.private.braintree.merchantId,
  publicKey: Meteor.settings.private.braintree.publicKey,
  privateKey: Meteor.settings.private.braintree.privateKey
});

Meteor.methods({
  generateClientToken: () => {
    return new Promise((resolve, reject) => {
      Gateway.clientToken.generate({}, (err, response) => {
        if (response.success) {
          resolve(response.clientToken);
        }
      });
    });
  },
  'payers.customers.new'(arguments) {
    check(arguments, Object);

    const { email, userId } = arguments;

    Gateway.customer.create({
      email: email,
    },  Meteor.bindEnvironment(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result.success) {
          Meteor.users.update({ _id: userId }, {
            $set: {
              "payments.customerId": result.customer.id,
              "profile.isCustomer": true
            }
          });

        }
      }
    }));

  },
  'payers.customers.update'(arguments) {
    check(arguments, Object);

    Gateway.customer.update(arguments.customerId, {
      firstName: arguments.firstName,
      lastName: arguments.lastName,
      company: arguments.company,
      phone: arguments.phone,
      website: arguments.website,
    }, Meteor.bindEnvironment(function (err, result) {
    }));

  },
  generatePaymentMethodNonce: () => {
    return new Promise((resolve, reject) => {
      Gateway.paymentMethodNonce.create("payment-gateway-platform", (err, response) => {
        if (err) {
          console.log(err);
        } else {
          resolve(response.paymentMethodNonce.nonce);
        }
      });
    });
  },
  'payers.paymentMethods.new' (arguments){
    check(arguments,Object);

    let user = Meteor.users.findOne({ _id: Meteor.userId() });

    Gateway.paymentMethod.create({
      cardholderName: arguments.cardholderName,
      cvv: arguments.cvv,
      expirationMonth: arguments.expiryMonth,
      expirationYear: arguments.expiryYear,
      customerId: user.payments.customerId,
      paymentMethodNonce: arguments.nonce,
      token: user._id+"-cc",
      options: {
        verifyCard: true
      }
    }, Meteor.bindEnvironment(function(err, result) {
      if (err) {
        console.log(err);
      }
    }));
  },
  'payers.creditCard.paymentMethod.find'(arguments){
    check(arguments,Object);
    Gateway.paymentMethod.find(arguments.token, function (err, paymentMethod) {

    });
  },
  'payers.payPal.paypalAccount.find'(arguments){
    check(arguments,Object);
    Gateway.paymentMethod.find(arguments.token, function (err, paypalAccount) {

    });
  },
  'payers.creditCard.paymentMethod.update' (arguments){
    check(arguments,Object);
    Gateway.paymentMethod.update(arguments.token, {
      billingAddress: {
        streetAddress: arguments.streetAddress,
        locality: arguments.locality,
        region: arguments.region,
        postalCode: arguments.postalCode
      }
    }, function (err, result) {}
    );
  },
  'payers.creditCard.paymentMethod.delete'(arguments){
    check(arguments,Object);
    Gateway.paymentMethod.delete(arguments.token, function (err) {

    });
  },

  'payers.subscriptions.create'(arguments){
    check(arguments,Object);
    Gateway.subscription.create({
      paymentMethodToken: "the_token",
      planId: "silverPlan"
    }, function (err, result) {

    });
  },

  'payers.subscriptions.cancel'(arguments){
    check(arguments,Object);
    Gateway.subscription.cancel(arguments.subscription.id, function (err, result) {

    });
  },

  'payers.subscriptions.update'(arguments){
    check(arguments,Object);
    Gateway.subscription.update(arguments.subscription.id, {
      id: arguments.id,
      paymentMethodToken: "newPaymentMethodToken",
      price: arguments.price,
      planId: "newPlan",
      merchantAccountId: "newMerchantAccount"
    }, function (err, result) {
    });
  },

  'payers.subscriptions.find'(arguments){
    Gateway.subscription.find(arguments.subscription.id, function (err, result) {

    });
  },
  // payers methods
  'payers.new'(arguments) {
    check(arguments,Object);

    Payers.upsert({
      createdBy: Meteor.userId()
    }, {
      $set: {
        cardholderName: arguments.cardholderName,
        cardNumber: arguments.cardNumber ,
        expiryMonth: arguments.expiryMonth,
        expiryYear: arguments.expiryYear,
        cvv: arguments.cvv,
      }
    });
  }
});
