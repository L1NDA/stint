import React from "react";
import {
    InstantSearch,
    Hits,
    SearchBox,
    Highlight
  } from 'react-instantsearch-dom';
import logo from "./imgs/logo.png";

import algoliasearch from 'algoliasearch/lite';
const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_KEY);
const index = searchClient.initIndex('staging_users');

console.log("Y0000000O", process.env.REACT_APP_ALGOLIA_ID, process.env.REACT_APP_ALGOLIA_KEY)

class Search extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="stint-search">
                <h1>Stint</h1>
                <InstantSearch indexName="staging_users" searchClient={searchClient}>
                <div className="right-panel">
                    <SearchBox />
                    <Hits hitComponent={Hit} />
                </div>
                </InstantSearch>
            </div>
        );
      }
}

function Hit(props) {
    return (
      <article>
        <h1>
          <Highlight attribute="name" hit={props.hit} />
        </h1>
      </article>
    );
  }

export default Search;