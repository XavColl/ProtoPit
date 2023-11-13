import { useState } from "react"
import { socket } from "../../socket"


export default function ListGames() {
    const user = localStorage.getItem('sptuser')

    const [games, setGames] = useState([])
    const [gameChosen, setGameChosen] = useState('')


    socket.on('game created', games => {
        setGames(games)
    })


    const handleClick = ({game, user}) => {
        socket.emit('join game', {game, user})
        setGameChosen(game)
    }


  return (
    <section>
        <h2>List Games</h2>
        {games.map((game, i) => {if(gameChosen === game) return <button key={i} disabled>{game}</button>
            return <button key={i} onClick={() => handleClick({game, user})}>{game}</button>
        })}
    </section>
  )
}
