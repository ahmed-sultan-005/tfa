import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {

  if (options.profile) {
    user.profile = options.profile;
    user.profile.isCustomer = false;
  }

  Meteor.setTimeout(() => {
    Meteor.call("payers.customers.new", {
      email: user.emails[0].address,
      userId: user._id
    }, (err, result) => {
      if(err){
        console.log(err);
      }
      else {
        console.log(result);
      }
    });
  }, 3000);

  return user;
});
