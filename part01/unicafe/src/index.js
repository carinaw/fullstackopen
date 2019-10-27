import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({good, neutral, bad, total}) => {

  if (good === 0 && neutral === 0 && bad === 0)
    return (
      <div>
        <p>No feedback given. <span role="img" aria-label="emoji">🙃</span></p>
      </div>
    )
  const average = Math.round(total / 3);
  const positive = (good / total)*100;
  const roundpositive = positive.toFixed(2) + "%"

  return (

    <table>
      <tbody>
        <Statistic name="good" value={good}/>
        <Statistic name="neutral" value={neutral}/>
        <Statistic name="bad" value={bad}/>
        <Statistic name="total" value={total}/>
        <Statistic name="average" value={average}/>
        <Statistic name="positive" value={roundpositive}/>
      </tbody>
    </table>
  )
}

const Statistic = ({name, value}) => {

  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({handler, label}) => {

  return (
    <button onClick={handler}>{label}</button>
  )

}

const App = (props) => {
  // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [total, setTotal] = useState(0)

    const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    }

    const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    }

    const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handler={handleGoodClick} label="good"/>
        <Button handler={handleNeutralClick} label="neutral"/>
        <Button handler={handleBadClick} label="bad"/>
      </div>
      <div>
        <h2>statistics</h2>
      </div>
      <div>
          <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
      </div>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
