import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./SearchBar.module.css";
import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchQuery, setSearchQuery, onEnter = () => {} }) {
  return (
    <div className={styles.SearchBar}>
      <input
        type="Search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter();
          }
        }}
      />
      <div
        className={`${styles.searchBtn} ${
          searchQuery.length >= 2 ? styles.enabled : ""
        }`}
        onClick={onEnter}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
    </div>
  );
}

export default SearchBar;
