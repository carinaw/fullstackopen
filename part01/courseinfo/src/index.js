import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
}
  return (
    <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce((a, num) => a + num.exercises, 0)
  return (
    <div>
      <p>Total number of exercises: {sum}</p>
    </div>
  )

}

const Part = (props) => {
  return (
    <div>
      <p>{props.parts.name}, {props.parts.exercises} Exercises</p>
    </div>
  )
}

const Content = (props) => {
  const lines = props.parts.map((part) => {
    return <Part parts={part}/>
  }
)
  return (
    <div>
      {lines}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
