import { Meteor } from 'meteor/meteor';

import { Churches } from '../churches.js';
import { Transactions } from '../../transactions/transactions.js';

import { ONE_MILE, MAX_RADIUS } from '../../../startup/both/business.js';

Meteor.publish("churches.search", function(yelpIds){
  check(yelpIds, Array);

  return Churches.find({"yelp.id": {$in: yelpIds}});
});

// Meteor.publishComposite('churches.show', function(yelpId){
//  return {
//   find: function() {
//     return Churches.find({ "yelp.id": yelpId });
//   },
//   children: [
//     {
//       find: function(church) {
//         return Transactions.find({churchId: church._id});
//       },
//     },
//   ]
//  }
// });

Meteor.publish('churches.show', function(yelpId){
   return Churches.find({ "yelp.id": yelpId });
});


Meteor.publish("churches.near", function(location){
  check(location, Object);

  let distance_in_meters = MAX_RADIUS * ONE_MILE;

  if (location && location.coords) {
    return Churches.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [location.coords.longitude, location.coords.latitude]
          },
          $maxDistance: distance_in_meters
        }
      }
    });
  }

});
