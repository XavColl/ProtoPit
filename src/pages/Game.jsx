import { useEffect, useState } from "react"
import { socket } from "../../socket"
import Board from "../components/Board"
import { Link, useLoaderData } from "react-router-dom"
import getUser from "../../lib/getUser"

export default function Game() {

    const [game, setGame] = useState({})
    const [place,setPlace] = useState(false)
    const [isGoing, setIsGoing] = useState(false)
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const [bunker, setBunker] = useState([])
    const [enemies, setEnemy] = useState([])
    const [randomMap, setRandomMap] = useState(0)
    const data = useLoaderData()

    useEffect(() => {
        const random = Math.floor(Math.random() * 7) + 1
        setRandomMap(random)
    }, [])

    const user = localStorage.getItem('sptuser')

    const activeBonus = (bonus) => {
        socket.emit('active bonus', {bonus, user})
    }

    const getBonuses = () => {
        switch (data.player.bonus) {
            case 'artificier':
                return ['bombe', 'bunker']
            case 'marcheur':
                return ['teleportation', 'globe']
            case 'fugitif':
                return ['intracable', 'breche']
            case 'architecte':
                return ['chantier', 'renovation']
            case 'banshee':
                return ['invisibilite', 'transparence']
            case 'voyageuse':
                return ['exil', 'escale']
            case 'illusioniste':
                return ['mimetisme', 'clonage']
            default:
                return ['no', 'no']
        }
    }

    const getEnemies = async (gm) => {
        console.log('WEIIII')
        const ids = gm.players.filter(p => p !== user)
        const arr = []
        ids.forEach(async id => {
            const usr = await getUser(id)
            arr.push(usr)
        })
        console.log(arr)
        setEnemy(arr)
    }


    useEffect(() => {
        socket.emit('game started', user)
    }, [])

    useEffect(()  => {
        if(game?.board && enemies.length === 0){
            getEnemies(game)
        }
    }, [game])

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

    socket.on('START', async gm => {
        console.log('blblblbl')
        setPlace(false)
        setIsGoing(true)
        setGame(gm)
    })

    socket.on('update game', gm => {
        setGame(gm)
        setBunker(gm.bunker)
        console.log(enemies)
    })

    if(win){
        return <><h1>YOU WIN</h1><Link to={'/ProtoPit/dashboard'} >Play Again</Link></>
    }

    if(lose){
        return <><h1>YOU LOSE</h1><Link to={'/ProtoPit/dashboard'} >Play Again</Link></>
    }

    if (!game?.board) return <p>Loading ...</p>

    return <div className="Game">
        <Board game={game} place={place} isGoing={isGoing} bunker={bunker} randomMap={randomMap} />
        <div className="side">
            <div className="spells">
            {
            (game.players[game.turn%game.players.length] === user 
            && game.bonus !== 'no' 
            && game.active[game.turn%game.players.length] > 0  
            && game.active[game.turn%game.players.length] < 4
            && game.state != 'clonage' ) ? 
            <> 
                <button className="self"onClick={() => {activeBonus(getBonuses()[0])}} >{getBonuses()[0]}</button>
                <button className="self"onClick={() => {activeBonus(getBonuses()[1])}} >{getBonuses()[1]}</button>
            </> :
            game.state === 'clonage' && game.players[game.turn%game.players.length] === user ? <><button onClick={() => {activeBonus(game.clonage)}} >{game.clonage}</button></> :
            <></> 
        }
            </div>
            <div className="infos">
                <h2>{data.player.pseudo} ( {data.player.bonus} ) {enemies.map(en =>{ return <span key={en.player._id}> against {en.player.pseudo} ( {en.player.bonus} )</span>})}</h2>
            </div>
        </div>
        
    </div>
}
