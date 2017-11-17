import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Search from '../pages/Search.jsx';

export default SearchContainer = createContainer(props => {
  const { churchText, locationText } = props.params;


  return {
    churchText: churchText,
    locationText: locationText
  };
}, Search);
