export default interface ICapitalWeather {
  coord: ICoordinates;
  weather: IWeather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface ISys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface IClouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ICoordinates {
  lon: number;
  lat: number;
}