import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ city }) => {
  const [forecast, setForecast] = useState([]);

  const angleToCardinal = (angle) => {
    const degreePerDirection = 360 / 8;
    const offsetAngle = angle + degreePerDirection / 2;

    return offsetAngle >= 0 * degreePerDirection &&
      offsetAngle < 1 * degreePerDirection
      ? "N"
      : offsetAngle >= 1 * degreePerDirection &&
        offsetAngle < 2 * degreePerDirection
      ? "NE"
      : offsetAngle >= 2 * degreePerDirection &&
        offsetAngle < 3 * degreePerDirection
      ? "E"
      : offsetAngle >= 3 * degreePerDirection &&
        offsetAngle < 4 * degreePerDirection
      ? "SE"
      : offsetAngle >= 4 * degreePerDirection &&
        offsetAngle < 5 * degreePerDirection
      ? "S"
      : offsetAngle >= 5 * degreePerDirection &&
        offsetAngle < 6 * degreePerDirection
      ? "SW"
      : offsetAngle >= 6 * degreePerDirection &&
        offsetAngle < 7 * degreePerDirection
      ? "W"
      : "NW";
  };

  const condition =
    forecast.length === 0 ? (
      <p>No weather data found</p>
    ) : (
      <div>
        <figure>
          <img
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            alt={`Weather forecast icon`}
            style={{ backgroundColor: "lightgray" }}
          />
          <figcaption>Condition: {forecast.weather[0].description}</figcaption>
        </figure>
        <p>Temperature: {forecast.main.temp} °C</p>
        <p>
          Wind: {forecast.wind.speed} direction{" "}
          {angleToCardinal(forecast.wind.deg)}
        </p>
      </div>
    );

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric `
      )
      .then((response) => {
        setForecast(response.data);
      });
  }, [city]);

  return (
    <div>
      <h3>Weather in {city}</h3>
      {condition}
    </div>
  );
};

export default Weather;
