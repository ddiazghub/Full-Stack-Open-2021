import React, { useState, useEffect } from "react";
import ICountry from "../shared/interfaces/ICountry";
import ICapitalWeather from "../shared/interfaces/ICapitalWeather";
import axios from "axios";

const CountryData = (props: { country: ICountry }): JSX.Element => {
  const [capitalWeather, setCapitalWeather] = useState<ICapitalWeather[]>([]);

  const degToCompass = (angle: number): string => {
    let value = Math.floor((angle / 22.5) + 0.5);
  
    return ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"][(value % 16)];
  };
  
  useEffect(() => {
    for (let capital of props.country.capital) {
      axios.get<ICapitalWeather>(`http://api.openweathermap.org/data/2.5/weather?q=${capital},${props.country.cca2.toLowerCase()}}&units=metric&appid=${process.env["REACT_APP_API_KEY"]}`)
        .then(response => {
          setCapitalWeather(capitalWeather.concat(response.data));
          console.log(response.data);
        });
    }  
  }, [props.country]);

  return (
    <div>
      <h1>{props.country.name.common}</h1>
      <p>{props.country.capital.length > 0 ? `Capitals: ${props.country.capital.join(", ")}` : `Capital: ${props.country.capital[0]}`}</p>
      <p>Population: {props.country.population}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(props.country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={props.country.flags.png} alt="Country flag" />
      {capitalWeather.map(capital => (
        <div key={capital.name}>
          <h2>Weather in {capital.name}</h2>
          <p><strong>Temperature:</strong> {capital.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${capital.weather[0].icon}@2x.png`} />
          <p><strong>Wind:</strong> {capital.wind.speed}m/s direction {degToCompass(capital.wind.deg)}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryData;