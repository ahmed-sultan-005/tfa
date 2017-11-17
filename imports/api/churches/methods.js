import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import Yelp from 'yelp-api-v3';

import { Churches } from './churches.js';
import { Cache } from './cache.js';

let yelp = new Yelp({
  app_id: Meteor.settings.private.YELP_APP_ID,
  app_secret: Meteor.settings.private.YELP_APP_SECRET
});

Meteor.methods({
  searchChurch(arguments) {
    check(arguments, Object);
    return new Promise((resolve, reject) => {
      // check if query is cached, else run new search and cache the data
      const currentCache = Cache.getCache(arguments);
      const ONE_HOUR = 60 * 60 * 1000;
      const CACHE_TIME = 4 * ONE_HOUR; // use to change cache duration
      if (currentCache && ((new Date) - currentCache.createdAt) < CACHE_TIME) {
        resolve(currentCache.businesses);
      } else {
        yelp.search({
          term: arguments.term,
          location: arguments.location,
          // categories: 'churches',
          limit: arguments.limit || 10,
          offset: arguments.offset || 0
        })
        .then(data => {
          let result = JSON.parse(data);

          // store in the cache
          Cache.setCache(arguments, result);

          // bind churches if not already in our backend
          _.map(result.businesses, (business) => {

            if (!Churches.findOne({"yelp.id": business.id})) {

              Churches.insert({
                coordinates: [business.coordinates.longitude, business.coordinates.latitude],
                location: {
                  city: business.location ? business.location.city : "",
                  address: business.location ? business.location.address1 : "",
                  zipCode: business.location ? business.location.zip_code : "",
                  state: business.location ? business.location.state : "",
                  country: business.location ? business.location.country : ""
                },
                name: business.name,
                phone: business.phone,
                yelp: {
                  id: business.id,
                  url: business.url,
                  imageUrl: business.image_url
                }
              });

            }

            resolve(result.businesses);

          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
        }); // END OF YELP PROMISE
      }
    })
  },
  updateChurch(arguments) {
    check(arguments, Object);

    Churches.update({_id: arguments._id}, {

      $set: {
        name: arguments.name,
        phone: arguments.phone,
        denomination: arguments.denomination,
        pastor: arguments.pastor,
        email: arguments.email,
        website: arguments.website,
        "location.address": arguments.location.address,
        claimed: true,
        claimerId: Meteor.userId()
      }
    });
    return arguments._id;
  }
});
