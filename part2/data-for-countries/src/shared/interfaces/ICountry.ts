export default interface ICountry {
  name: ICountryName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: ICurrencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: ILanguages;
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: IDemonyms;
  flag: string;
  maps: IMaps;
  population: number;
  gini: IGini;
  fifa: string;
  car: ICar;
  timezones: string[];
  continents: string[];
  flags: IFlags;
  coatOfArms: IFlags;
  startOfWeek: string;
  capitalInfo: ICapitalInfo;
  postalCode: IPostalCode;
}

interface IPostalCode {
  format: string;
  regex: string;
}

interface ICapitalInfo {
  latlng: number[];
}

interface IFlags {
  png: string;
  svg: string;
}

interface ICar {
  signs: string[];
  side: string;
}

interface IGini {
  '2018': number;
}

interface IMaps {
  googleMaps: string;
  openStreetMaps: string;
}

interface IDemonyms {
  eng: IDemonym;
  fra: IDemonym;
}

interface IDemonym {
  f: string;
  m: string;
}

interface Translations {
  ara: ILanguage;
  ces: ILanguage;
  cym: ILanguage;
  deu: ILanguage;
  est: ILanguage;
  fin: ILanguage;
  fra: ILanguage;
  hrv: ILanguage;
  hun: ILanguage;
  ita: ILanguage;
  jpn: ILanguage;
  kor: ILanguage;
  nld: ILanguage;
  per: ILanguage;
  pol: ILanguage;
  por: ILanguage;
  rus: ILanguage;
  slk: ILanguage;
  spa: ILanguage;
  swe: ILanguage;
  urd: ILanguage;
  zho: ILanguage;
}

interface ILanguages {
  eng: string;
  mlt: string;
}

interface Idd {
  root: string;
  suffixes: string[];
}

interface ICurrencies {
  EUR: ICurrency;
}

interface ICurrency {
  name: string;
  symbol: string;
}

interface ICountryName {
  common: string;
  official: string;
  nativeName: INativeName;
}

interface INativeName {
  eng: ILanguage;
  mlt: ILanguage;
}

interface ILanguage {
  official: string;
  common: string;
}