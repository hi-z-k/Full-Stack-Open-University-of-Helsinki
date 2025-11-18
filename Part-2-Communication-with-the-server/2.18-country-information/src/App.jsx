import { useState, useEffect } from "react";
import CountriesAPI from "./services/CountriesAPI";
import Country from "./Components/Country";


const Search = ({ query, onQuery }) => {
  return (
    <>
      find countries: <input value={query} onChange={onQuery} />
    </>
  );
};

const searchCountries = (query, countries) => {
  if (countries && query) {
    return countries.filter(country => country.startsWith(query))
  }
  return []
}

const Display = ({ query, countries }) => {
  const queryResult = searchCountries(query, countries)
  const length = queryResult.length
  if (!length) {
    return <p>No countries found</p>
  }
  if (length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (length > 1) {
    return <div className="countries">
      {queryResult.map(country => <p key={country}>{country}</p>)}
    </div>
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
    const query = e.target.value.toLowerCase()
    setQuery(query);
  };


  return (
    <>
      <Search query={query} onQuery={handleQuery} />
      <Display query={query} countries={countries} />
    </>
  );
};

export default App;
