const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Content = ({ data }) => {
  return (
    <div className="exerices">
      {Object.entries(data).map(([title, content]) =>
        <p>
          {title} {content}
        </p>
      )}
    </div>)
}
const Total = ({ data }) => {
  const count = Object.values(data).reduce((total, exercise) => total + exercise, 0)
  return <p>Number of exercises {count}</p>
}

const App = () => {
  const courseName = 'Half Stack application development'
  const data = {
    "part1": 10,
    "part2": 7,
    "part3": 14,
  }
  return (
    <div>
      <Header course={courseName} />
      <Content data={data} />
      <Total data={data} />
    </div>
  )
}

export default App