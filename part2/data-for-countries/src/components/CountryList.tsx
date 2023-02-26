import React, { useEffect, useState } from "react";
import ICountry from "../shared/interfaces/ICountry";
import CountryData from "./CountryData";

const CountryList = (props: { countries: ICountry[] }): JSX.Element => {
  const [shown, setShown] = useState<number>(-1);

  useEffect(() => {
    setShown(-1);
  }, [props.countries]);

  const showCountry = (event: React.MouseEvent<HTMLButtonElement>): void => {
    let index = event.currentTarget.getAttribute("data-index");

    if (index !== null)
      setShown(parseInt(index));
    
    console.log(index);
  };

  if (props.countries.length == 1)
    return <CountryData country={props.countries[0]} />;

  if (props.countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (shown !== -1)
    return <CountryData country={props.countries[shown]} />;
  
  return (
    <ul>
      {props.countries.map((country, index) => (
        <li key={country.name.official}>
          <p>{country.name.common}</p>
          <button data-index={index} onClick={showCountry}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
