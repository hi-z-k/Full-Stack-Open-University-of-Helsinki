
const List = ({ title, data,format=(n=>n) }) => {
  if (!data) return null
  const dataArr = Array.isArray(data) ? data:[data]
  const content = dataArr.map(format)
  return <div>
        {(title) && <b>{title}: </b>}
        <i>{content.join(", ")}</i>
  </div>
}

export default List