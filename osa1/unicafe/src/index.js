import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <div><h1>{text}</h1></div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({ stats }) => {

  if (stats[0] === 0 & stats[1] === 0 & stats[2] === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const all = stats[0] + stats[1] + stats[2]
  const avg = (stats[0] - stats[2]) / all
  const positive = stats[0] / all * 100

  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={stats[0]} />
        <StatisticsLine text="neutral" value={stats[1]} />
        <StatisticsLine text="bad" value={stats[2]} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={avg} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const StatisticsLine = ({ text, value }) => {
  if (text === "positive") {
    return (

      <tr><td>{text}</td><td>{value} %</td></tr>

    )
  }
  return (

    <tr><td>{text}</td><td>{value}</td></tr>

  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics stats={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

