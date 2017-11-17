import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {

  if(Meteor.users.find().count() == 0){

    [1, 2].forEach(idx => {
      let userId = Accounts.createUser({
        email: `user-${idx}@tfa.com`,
        password: "password",
      });

    });

  }

});
