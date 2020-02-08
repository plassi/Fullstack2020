import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
    <div>
      <h1>
        {props.text}
      </h1>
    </div>
  )
}

const Button = (props) => <button onClick={props.clickHandler}>{props.text}</button>


const nextAnecdote = (setSelected) => {
  const rnd = Math.floor(Math.random() * 6)
  console.log("selected index", rnd)
  setSelected(rnd)
}

const vote = (selected, points, setPoints) => {
  const copy = [...points]
  copy[selected] += 1
  setPoints(copy)
}

const MostVoted = ({ points }) => {
  const copy = [...points]
  const i = copy.indexOf(Math.max(...copy))
  console.log("points array", copy)
  console.log("index of most voted", i)

  if (Math.max(...copy) === 0) {
    return (<></>)
  }
  return (
    <div>
      <div><h1>Anecdote with most votes</h1></div>

      <div>
        {anecdotes[i]}
      </div>
    </div>
  )

}

const App = (props) => {
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const [selected, setSelected] = useState(0)


  // luodaan 6:n mittainen taulukko äänille arvoilla 0

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button clickHandler={() => vote(selected, points, setPoints)} text="vote" />
      <Button clickHandler={() => nextAnecdote(setSelected)} text="next anecdote" />
      <MostVoted points={points} />
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
  document.getElementById('root')
)