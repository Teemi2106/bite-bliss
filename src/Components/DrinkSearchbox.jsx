import React from "react";

const DrinkSearchbox = ({ setSearchDrink }) => {
  return (
    <div>
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="search__input"
          placeholder="Search for a drink"
          required
          onChange={(e) => setSearchDrink(e.target.value)}
        />
      </form>
    </div>
  );
};

export default DrinkSearchbox;
