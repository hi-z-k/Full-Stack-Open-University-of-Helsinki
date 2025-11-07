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
        <Part key={part.id}title={part.name} count={part.exercises}/>
      )}
    </div>)
}
const Total = ({ data }) => {
  const count = data.reduce((total, part) => total + part.exercises, 0)
  return <p>Number of exercises {count}</p>
}
const Course = ({course})=>{
  return <div key={course.id}>
      <Header course={course.name} />
      <Content data={course.parts} />
      <Total data={course.parts}/>
    </div>
}

export default Course