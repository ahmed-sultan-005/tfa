import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class ChurchListMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      lat: 40.7377792928906,
      lng: -73.9895899828034
    };

    //binding functions
    autoBind(this);
  }

  componentDidMount() {
    const options = {
      zoom: 15,
      center: new google.maps.LatLng(this.state.lat, this.state.lng)
    }

    this.map = new google.maps.Map(document.getElementById("place-search-map"), options);
    this.infoWindow = new google.maps.InfoWindow();
    this.bounds = new google.maps.LatLngBounds();

    // this._updateMap();
  }

  componentDidUpdate() {
    this._updateMap();
  }

  _updateMap() {
    this._clearMarkers();

    this.props.searchResults.forEach((result, index) => this._createMarker(result, index));

    this.state.lat = this.props.searchResults[0].coordinates.latitude;
    this.state.lng = this.props.searchResults[0].coordinates.longitude;
  }

  _clearMarkers() {
    this.state.markers = [];
  }

  _createMarker(place, index) {
    const infoWindow = this.infoWindow;
    const map = this.map;
    const location = new google.maps.LatLng(place.coordinates.latitude, place.coordinates.longitude);
    const marker = new google.maps.Marker({
      map: map,
      position: location,
      icon: this._getPin(),
      labelContent: (index + 1) + '',
      label: ' ',
      labelAnchor: new google.maps.Point(15, 30),
      labelClass: "google-map-marker-label",
      labelInBackground: false
    });

    this.bounds.extend(location);
    this.state.markers.push(marker);
    this.map.fitBounds(this.bounds);

    marker.addListener("click", () => {
      infoWindow.setContent(place.name);
      infoWindow.open(map, marker);
    })
  }

  _getPin(){
    return {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: '#F78519',
        fillOpacity: 1,
        strokeColor: '#C45200',
        strokeWeight: 1,
        scale: 0.7
    };
  }

  render() {

    return (
      <div id="place-search-map"/>
    );
  }

}

ChurchListMap.propTypes = {
  searchResults: React.PropTypes.array
}
