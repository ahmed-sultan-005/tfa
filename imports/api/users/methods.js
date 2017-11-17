import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  usersRegister(data) {
    check(data, Object);

    let userId = Accounts.createUser({
      email: data.email,
      password: data.password
    });

    Accounts.sendVerificationEmail(userId);

    return userId;
  },
  verifyUser(){
    Accounts.sendVerificationEmail(Meteor.userId());
  },
  removeUser: (userId) => {
    check(userId, String);

    Meteor.users.remove(userId);
  }

});
