import { Mongo } from 'meteor/mongo';

const CacheCollection = new Mongo.Collection('cache');

// use to cache and retrieve api searches
export const Cache = {
  getCache(args) {
    return CacheCollection.findOne({args: JSON.stringify(args)});
  },

  setCache(args, data) {
    const key = JSON.stringify(args);

    // remove and update with new data
    CacheCollection.remove({args: key});
    CacheCollection.insert(Object.assign({},
      data, {args: key, createdAt: new Date}));
  }
}