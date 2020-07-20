import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import "./style/search.css";

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_KEY);

class Search extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
          <div>
            <header className="header">
              <h1 className="header-title">
                <a href="/">Searching shit</a>
              </h1>
            </header>
    
            <div className="container">
              <InstantSearch searchClient={searchClient} indexName="staging_users">
                <div className="search-panel">
                  <div className="search-panel__results">
                    <SearchBox
                      className="searchbox"
                      translations={{
                        placeholder: '',
                      }}
                    />
                    <Hits hitComponent={Hit} />
                    <div className="pagination">
                      <Pagination />
                    </div>
                  </div>
                </div>
              </InstantSearch>
            </div>
          </div>
        );
      }
}

function Hit(props) {
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