import React, { useState } from "react"

function Player({ name, symbol, isActive, onChnageName }) {
  const [playerName, setPlayerName] = useState(name)
  const [isEditing, setIsEditing] = useState(false)

  let player = <span className="player-name">{playerName}</span>

  if (isEditing) {
    player = (
      <input
        type="text"
        placeholder="Enter a name"
        value={playerName}
        onChange={(e) => {
          setPlayerName(e.target.value)
        }}
      />
    )
  }

  const editHandler = () => {
    setIsEditing((prev) => !prev)
    onChnageName(symbol, playerName)
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-name">{player}</span>
        <span className="player-symbol">{symbol}</span>
        <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  )
}

export default Player
