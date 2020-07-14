import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <figure>
        <img src={country.flag} alt={`Flag of ${country.name}`} width={`250px`} />
        <figcaption>{`Flag of ${country.name}`}</figcaption>
      </figure>
      <h3>Details</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
        <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <Weather city={country.capital} />
    </div>
  );
};

export default Country;
