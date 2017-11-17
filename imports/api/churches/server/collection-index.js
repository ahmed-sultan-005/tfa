import { Churches } from '../churches.js';

// location index created
Churches._ensureIndex({coordinates: "2dsphere"});
