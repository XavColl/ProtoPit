import { useState } from "react"
import { socket } from "../../socket"

export default function GameChoices() {

  const user = localStorage.getItem('sptuser')

  const [bonus, setBonus] = useState('start')
  const [pieces, setPieces] = useState(1)
  const [squares, setSquares] = useState(15)
  const [players, setPlayers] = useState(2)
  const [name,setName] = useState('')

  const createGame = (e) => {
    e.preventDefault()
    socket.emit('create game', { bonus, pieces, squares, players, user, name })
  }


  return (
    <form>
      <label htmlFor='bonus'>Bonus</label>
      <select name='bonus' id='bonus' value={bonus} onChange={ e => setBonus(e.target.value) }>
        {/* 
          start : 2 powers, all orbs from the start
          turns : 2 orbs pop each 3 turns
          no
        */}
        <option value='start'>Start</option>
        <option value='turns'>Turns</option>
        <option value='no'>No</option>
      </select>
      <br />
      <label htmlFor='pieces'>Pieces Each</label>
      <select name='pieces each' id='pieces' value={pieces} onChange={ e => setPieces(e.target.value) }>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
      <br />
      <label htmlFor='squares'>Squares</label>
      <select name='squares' id='squares' value={squares} onChange={e => setSquares(e.target.value)}>
        <option value={10}>10</option>
        <option value={11}>11</option>
        <option value={12}>12</option>
        <option value={13}>13</option>
        <option value={14}>14</option>
        <option value={15}>15</option>
        <option value={16}>16</option>
        <option value={17}>17</option>
        <option value={18}>18</option>
        <option value={19}>19</option>
        <option value={20}>20</option>
      </select>
      <br />
      <label htmlFor="players">Players</label>
      <select name='players' id='players' value={players} onChange={e => setPlayers(e.target.value)}>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select >
      <br />
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
      <button type='submit' onClick={e => createGame(e)}>Create Game</button>
    </form>
  )
}
