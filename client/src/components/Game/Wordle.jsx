import { useState, useEffect } from 'react'
import './Wordle.css'

export default function Wordle() {
  const [word, setWord] = useState('')
  const [guesses, setGuesses] = useState([])
  const [gameOver, setGameOver] = useState(false)

  return (
    <div className="wordle-container">
      <h3>Wordle Game</h3>
      {/* Game logic will be implemented here */}
      <p>Wordle component</p>
    </div>
  )
}
