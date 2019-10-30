import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({courses}) => {
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


export default Course
