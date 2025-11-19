
const CountryList = ({ data, onShow }) => {
  return (<div>
    {data.map(c => {
    return <div key={c}>
    {c} <button onClick={()=>onShow(c)}>Show</button>
  </div>
  })}</div>)
}
export default CountryList