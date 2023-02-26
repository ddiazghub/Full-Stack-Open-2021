import React, { useEffect, useState } from 'react';
import ICountry from './shared/interfaces/ICountry';
import TextField from './components/TextField';
import CountryList from './components/CountryList';
import axios from 'axios';

const App = (): JSX.Element => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    axios.get<ICountry[]>("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const filterRegExp: RegExp = new RegExp(filter.toLowerCase());
  const matches: ICountry[] = filter ? countries.filter(country =>
    filterRegExp.test(country.name.common.toLowerCase())
  ) : [];

  const changeFilter: ((event: React.ChangeEvent<HTMLInputElement>) => void) = (event) => {
    setFilter(event.target.value);
  };
  
  return (
    <div>
      <TextField label="Find countries" onChange={changeFilter} />
      <CountryList countries={matches} />
    </div>
  )
};

export default App;