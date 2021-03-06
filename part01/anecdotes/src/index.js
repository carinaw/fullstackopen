import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(6))

  const randomquote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const vote = () => {

    const addVote = [...votes]
    addVote[selected] += 1
    setVotes(addVote)
    }

  const highestVotes = Math.max.apply(null, votes)

  const bestanecdote = votes.indexOf(highestVotes)

  return (
    <div>
      <div>
      <h1>random anecdote</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes.</p>
      </div>
      <div>
        <button onClick={randomquote}>new anecdote</button>
        <button onClick={vote}>vote</button>
      </div>
      {highestVotes > 0 &&
        <div>
          <h1>anecdotes with most votes</h1>
          <p>{props.anecdotes[bestanecdote]}</p>
          <p> with {highestVotes} votes.</p>
        </div>
      }
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root'))
