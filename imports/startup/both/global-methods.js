import { Random } from 'meteor/random';
// global methods

module.exports = {

  capitalize: (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  },
  generateInvoiceNumber: () => {
    return Random.id().substr(10, 5).toUpperCase();
  },
};
