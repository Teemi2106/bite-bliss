import React from "react";
import "../CSS/searchbox.css";

const Searchbox = ({ setSearch }) => {
  return (
    <div>
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="search__input"
          placeholder="Search for a meal"
          required
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Searchbox;
