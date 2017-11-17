import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
  if (Meteor.settings.smtp) {
    const smtp = {
        username:  Meteor.settings.smtp.username,
        password: Meteor.settings.smtp.password,
        server:   'smtp.mailgun.org',
        port: 587
    }

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  }
});
