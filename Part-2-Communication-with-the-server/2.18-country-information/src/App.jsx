import { useState, useEffect } from "react";
import CountriesAPI from "./services/CountriesAPI";
import Country from "./Components/Country";
import CountryList from "./Components/CountryList";


const Search = ({ query, onQuery }) => {
  return (
    <>
      find countries: <input value={query} onChange={onQuery} />
    </>
  );
};

const searchCountries = (query, countries) => {
  if (countries && query) {
    return countries.filter(country => country.toLowerCase().startsWith(query.toLowerCase()))
  }
  return []
}

const Display = ({ query, countries, onShow }) => {
  const queryResult = searchCountries(query, countries)
  const length = queryResult.length
  if (!length) {
    return <p>No countries found</p>
  }
  if (length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (length > 1) {
    return <CountryList data={queryResult} onShow={onShow}/>
  }
  else {
    return <Country name={queryResult[0]} />
  }
}
const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    CountriesAPI.loadCountries().then((c) => setCountries(c));
  }, []);


  const handleQuery = (e) => {
    const query = e.target.value
    setQuery(query);
  };


  return (
    <>
      <Search query={query} onQuery={handleQuery} />
      <Display query={query} countries={countries} onShow={(c)=>setQuery(c)} />
    </>
  );
};

export default App;
