import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import "./style/search.css";

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_KEY);
const index = searchClient.initIndex('staging_users');

class Search extends React.Component {
    constructor() {
        super();
        this.state = {};
    }



    render() {
        return (
          <div className="ais-InstantSearch">
            <h1>Search</h1>
            <InstantSearch indexName="staging_users" searchClient={searchClient}>
              <div className="left-panel">
                <ClearRefinements/>
                <h2>Filter</h2>
                  <RefinementList attribute=  "profile.softwareDev.skillsArray" />
                  <RefinementList attribute=  "profile.dataAnalytics.skillsArray" />
                  <RefinementList attribute=  "profile.design.skillsArray" />
                  <RefinementList attribute=  "profile.contentCreation.skillsArray" />
                <Configure hitsPerPage={8} />
              </div>
              <div className="right-panel">
                <Hits hitComponent={Hit} />
                <Pagination />
              </div>
            </InstantSearch>
          </div>
        );
      }
}

function Hit(props) {
  console.log()
    return (
      <article>
        <h1>
          <Highlight attribute="displayName" hit={props.hit} />

        </h1>
      </article>
    );
  }

  Hit.propTypes = {
    hit: PropTypes.object.isRequired,
  };

export default Search;
