import { useState,useEffect } from "react"
import CountriesAPI from "../services/CountriesAPI"
import List from "./List";
import { getCityWeather } from "../services/WeatherAPI";

const Link = ({url,children})=>{
  return <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer">
        {children}</a>
}
const WeatherCity = ({data})=>{
  const {city,weather,temp,wind} = data
  return <div>
    <h2>{city}</h2>
    <List title="Temperature" data={temp} />
    <img src={weather} alt={"icon"} height="75em" />
    <List title="Wind" data={wind} />
  </div>
}
const WeatherList = ({data})=>{
  return <div className="weather">
    {data.map(city => <WeatherCity key={city.city} data={city}/>)}
  </div>
}
const Country = ({ name }) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    CountriesAPI.getCountry(name)
      .then(country=>{
        const cities = country.capital.map(c=>getCityWeather(c))
        return Promise.all(cities).then(weather=>{return {...country,weather}})}
      )
      .then(c=>{
        setCountry(c)})
      .catch(e=>{console.log(`Couldn't load the country ${e}`)})
  }, [name])
  return (country) && (
    <div key={country.area}>
      <h1>{country.name}{country.icon} - {country.nativeName}</h1>
      <h3><Link url={country.map}>{country.official}</Link></h3>
      <List title="Area" data={country.area}/>
      <img src={country.flag} alt={`Flag of ${country.name}`} height="150em" />
      <List title="Capital" data={country.capital} />
      <List title="Region" data={country.region} />
      <List title="Continent" data={country.continents} />
      <List title="Languages" data={country.languages} />
      <WeatherList data={country.weather}/>
    </div>)
}

export default Country