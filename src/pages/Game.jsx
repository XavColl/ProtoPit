import { useEffect, useState } from "react"
import { socket } from "../../socket"
import Board from "../components/Board"
import { Link, useLoaderData } from "react-router-dom"

export default function Game() {

    const [game, setGame] = useState({})
    const [place,setPlace] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const [bunker, setBunker] = useState([])
    const data = useLoaderData()

    const user = localStorage.getItem('sptuser')

    const activeBonus = (bonus) => {
        socket.emit('active bonus', {bonus, user})
    }


    useEffect(() => {
        socket.emit('game started', user)
    }, [])

    socket.on('place pieces', gm => {
        setGame(gm.game)
        if(gm.turn.turn === user) setPlace(true)
        else setPlace(false)
        
    })

    socket.on('end game', data => {
        console.log(data)
        console.log(user)
        if(data.winner === user) setWin(true)
        else setLose(true)
    })

    socket.on('START', gm => {
        console.log('blblblbl')
        setPlace(false)
        setIsGoing(true)
        setGame(gm)
    })

    socket.on('update game', gm => {
        setGame(gm)
        setBunker(gm.bunker)
    })

    if(win){
        return <><h1>YOU WIN</h1><Link to={'/ProtoPit/dashboard'} >Play Again</Link></>
    }

    if(lose){
        return <><h1>YOU LOSE</h1><Link to={'/ProtoPit/dashboard'} >Play Again</Link></>
    }

    if (!game?.board) return <p>Loading ...</p>

    return <div className="Game">
        <Board game={game} place={place} isGoing={isGoing} bunker={bunker} />
        {
            (game.players[game.turn%game.players.length] === user 
            && game.bonus !== 'no' 
            && game.active[game.turn%game.players.length] > 0  
            && game.active[game.turn%game.players.length] < 4
            && game.state != 'clonage' ) ? 
            <> 
                <button onClick={() => {activeBonus(data.player.bonus[0])}} >{data.player.bonus[0]}</button>
                <button onClick={() => {activeBonus(data.player.bonus[1])}} >{data.player.bonus[1]}</button>
            </> :
            game.state === 'clonage' ? <><button onClick={() => {activeBonus(game.clonage)}} >{game.clonage}</button></> :
            <></> 
        }
    </div>
}
