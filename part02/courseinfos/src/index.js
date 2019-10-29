import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
        <Title title="Web development" />
        <Name name={courses[0].name} />
        <Parts parts={courses[0].parts} />
        <Total parts={courses[0].parts} />
        <Name name={courses[1].name} />
        <Parts parts={courses[1].parts} />
        <Total parts={courses[1].parts} />
    </div>
  )
}

const Title = ({title}) => {
  return <h1>{title}</h1>
}

const Name = ({name}) => {
  return (
  <h2>{name}</h2>
  )
}

const Part = ({part}) => {
  return (
  <p>{part.name}, {part.exercises} Exercises</p>
  )
}

const Parts = ({parts}) => {
  const info = parts.map(part => <Part key={part.id} part={part} />)
  return (
    <div>{info}</div>
  )
}

const Total = ({parts}) => {

  const totalexercises = parts.reduce((sum, exercise) => sum + exercise.exercises, 0)
    return (
      <h4 key={parts.id}>This is the total: {totalexercises}</h4>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))
