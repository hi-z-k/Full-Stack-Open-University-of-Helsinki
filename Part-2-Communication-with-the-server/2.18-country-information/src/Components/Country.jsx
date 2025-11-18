import { useState,useEffect } from "react"
import CountriesAPI from "../services/CountriesAPI"


const List = ({ title, data,format=(n=>n) }) => {
  if (!data) return null
  const dataArr = Array.isArray(data) ? data:[data]
  const content = dataArr.map(format).join(", ")
  return <>
    <p><b>{title}</b>: <i>{content}</i></p>
  </>
}
const Link = ({url,children})=>{
  return <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer">
        {children}</a>
}
const Country = ({ name }) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    CountriesAPI.getCountry(name)
      .then(c => setCountry(c))
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
    </div>)
}

export default Country