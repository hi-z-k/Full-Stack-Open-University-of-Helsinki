import axios from "axios";

const API_URL = "https://studies.cs.helsinki.fi/restcountries/api";
const ALL_EP = "/all";
const NAME_EP = "/name/";

const loadCountries = () => {
  const link = API_URL + ALL_EP;
  return axios
    .get(link)
    .then((response) => response.data)
    .then((data) => data.map((country) => country.name.common.toLowerCase()))
};

const getCountry = (country) => {
  const link = API_URL + NAME_EP + country;
  return axios
    .get(link)
    .then((response) => response.data)
    .then((c) => {
      const nativeName = Object.values(c.name.nativeName).map(
        (n) => n.official
      )[0];
      const languages = Object.values(c.languages);
      return {
        name:c.name.common,
        icon: c.flag,
        official: c.name.official,
        nativeName,
        map: c.maps.googleMaps,
        capital: c.capital,
        region: c.subregion,
        continents: c.continents,
        flag: c.flags.svg,
        area: c.area,
        languages,
      };
    })
};

export default { loadCountries, getCountry };
