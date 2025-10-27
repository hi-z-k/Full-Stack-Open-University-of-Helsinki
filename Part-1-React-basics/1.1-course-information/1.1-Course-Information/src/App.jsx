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
      {data.map((part) =>
        <Part key={part.name}title={part.name} count={part.exercises}/>
      )}
    </div>)
}
const Total = ({ data }) => {
  const count = data.reduce((total, part) => total + part.exercises, 0)
  return <p>Number of exercises {count}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content data={parts} />
      <Total data={parts} />
    </div>
  )
}

export default App