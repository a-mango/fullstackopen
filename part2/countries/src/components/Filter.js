import React from "react";

const Filter = ({ filter, setFilter, handleFilterChange }) => {
  return (
    <div>
      <form onSubmit={setFilter}>
        <div>
          Find countries: <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
