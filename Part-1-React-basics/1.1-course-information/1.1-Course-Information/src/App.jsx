const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({title, count}) => {
  return (
    <p>
      {title} {count}
    </p>
  )
}

const Content = ({ data }) => {
  return (
    <div className="exercise-list">
      {Object.entries(data).map(([title, count]) =>
        <Part title={title} count={count}/>
      )}
    </div>)
}
const Total = ({ data }) => {
  const count = Object.values(data).reduce((total, count) => total + count, 0)
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