import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { _ } from 'meteor/underscore';
import autoBind from 'react-autobind';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

import ChurchListItem from '../components/ChurchListItem.jsx';
import ChurchListMap from '../components/ChurchListMap.jsx';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 10,
      offset: 0,
      hasMore: true,
      churches: []
    };

    Meteor.call('searchChurch', {
      term: this.props.churchText,
      location: this.props.locationText
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        this.setState({ churches: response });
      }
    });

    //binding functions
    autoBind(this);
  }

  loadMore() {
    let churches = [];
    churches.push(this.state.churches);

    Meteor.call('searchChurch', {
      term: this.props.churchText,
      location: this.props.locationText,
      limit: this.state.limit,
      offset: this.state.offset
    }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        churches.push(response);

        this.setState({
          churches: _.flatten(churches),
          offset: this.state.limit + this.state.offset,
          hasMore: response.length > 0 ? true : false
        });

      }
    });

  }

  renderChurchItems(churches) {
    return (
      <div className="place-search-list">
        {
          churches.map((church, index) => {
            return (
              <ChurchListItem
                key={index}
                church={church}
                index={index}
              />
            );
          })
        }
      </div>
    );
  }

  render() {

    return (
      <div className="">

        <div className="container" style={{paddingTop: "9px"}}>

          <div className="row">
            <div className="columns small-7 medium-7">
             <h2 className="graybg"><span className="graybg_span">112 churches</span> Within <span className="graybg_span">30 miles</span> of <span className="graybg_span">94112</span> <i className="fa fa-list right pull-right" style={styles.filter}></i>
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="place-search-list-container  columns small-7 medium-7">

              <InfiniteScroll
                  pageStart={0}
                  loadMore={this.loadMore}
                  hasMore={this.state.hasMore}
                  loader={<div className="loader text-center">Loading ...</div>}
              >
                {this.renderChurchItems(this.state.churches)}
              </InfiniteScroll>
            </div>

            <div className="container">
              <div className="row">
                <div className="place-search-map-container columns small-5 medium-5 fixed contain-to-grid" >
                  <ChurchListMap
                    searchResults={this.state.churches}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  churchText: React.PropTypes.string,
  locationText: React.PropTypes.string
}

const styles = {
  filter: {
    marginTop: "10px",
    marginRight: "10px"
  }
}
