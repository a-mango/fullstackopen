import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  let matches;

  if (countries.length === 0) matches = <p>No match found</p>;
  else if (countries.length === 1) matches = <Country country={countries[0]} />;
  else if (countries.length > 10)
    matches = <p>Too many matches, specify another filter</p>;
  else
    matches = (
      <ul>
        {countries.map((country) => (
          <li key={country.alpha2Code}>{country.name}</li>
        ))}
      </ul>
    );

  return <div>{matches}</div>;
};

export default Countries;
