import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const countriesToShow =
    filter === ""
      ? countries
      : countries.filter((country) =>
          country.name.toUpperCase().includes(filter.toUpperCase())
        );

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSelectCountry = (country) => {
    setFilter(country);
  };

  return (
    <div>
      <h1>Countries</h1>
      <Filter
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countries={countriesToShow}
        handleSelectCountry={handleSelectCountry}
      />
    </div>
  );
};

export default App;
