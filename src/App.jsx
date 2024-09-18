import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./wininngCombinations"
import GameOver from "./components/GameOver"

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

const PLAYERS = {
  X: "Player1",
  O: "Player2",
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialBoard.map((array) => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  return gameBoard
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X"

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"
  }

  return currentPlayer
}

function deriveWinner(gameBoard) {
  let winner

  for (let combination of WINNING_COMBINATIONS) {
    const firstSquareValue = gameBoard[combination[0].row][combination[0].col]
    const secondSquareValue = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareValue = gameBoard[combination[2].row][combination[2].col]

    if (
      firstSquareValue &&
      firstSquareValue === secondSquareValue &&
      firstSquareValue === thirdSquareValue
    ) {
      firstSquareValue
      winner = firstSquareValue
    }
  }
  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  const gameBoard = deriveGameBoard(gameTurns)
  const activePlayer = deriveActivePlayer(gameTurns)
  const winner = deriveWinner(gameBoard)
  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prev) => {
      const currentPlayer = deriveActivePlayer(prev)
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prev,
      ]

      return updatedTurns
    })
  }

  function onChnageName(symbol, name) {
    setPlayers((prev) => ({
      ...prev,
      [symbol]: name,
    }))
  }
  players

  function handleRestart() {
    setGameTurns([])
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChnageName={onChnageName}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChnageName={onChnageName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            player={players[winner]}
            onRestart={handleRestart}
          />
        )}
        <GameBoard
          gameBoard={gameBoard}
          handleSelectSquare={handleSelectSquare}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
