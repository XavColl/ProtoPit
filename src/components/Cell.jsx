/* eslint-disable react/prop-types */

import { socket } from "../../socket"

export default function Cell({cell ,game, place, isGoing, bunker}) {
    const user = localStorage.getItem('sptuser')
    

    const placePlayer = () => {
        socket.emit('place player', { user, cell})
    }

    const isPlaceable = (cell) => {
        let xUp = {type: ''}
        let xDown = {type: ''}
        let yUp = {type: ''}
        let yDown = {type: ''}
        if(cell.x<game.board.length-1) xUp = game.board[cell.x + 1][cell.y]
        if(cell.x>0)  xDown = game.board[cell.x - 1][cell.y]
        if(cell.y<game.board.length-1) yUp = game.board[cell.x][cell.y + 1]
        if(cell.y>0) yDown = game.board[cell.x][cell.y - 1]

        if(cell.type !== 'player' 
        && cell.type !== 'special' 
        && xUp.type !== 'player' 
        && xUp.type !== 'special'
        && xDown.type !== 'player'
        && xDown.type !== 'special'
        && yUp.type !== 'player'
        && yUp.type !== 'special'
        && yDown.type !== 'player'
        && yDown.type !== 'special'){
            return true
        }
        else return false
    }

    const isRenovable = (cell) => {
        try{
            let position = game.turnPieces[game.turn]
            let isMyTurn = game.players[game.turn%game.players.length] == user
            let upX = {x: -1, y: -1}
            let downX = {x: -1, y: -1}
            let upY = {x: -1, y: -1}
            let downY = {x: -1, y: -1}
            if(cell.x<game.board.length-1) upX = {x: cell.x + 1, y: cell.y }
            if(cell.x>0)  downX = {x :cell.x - 1, y: cell.y}
            if(cell.y<game.board.length-1) upY = {x: cell.x, y: cell.y + 1}
            if(cell.y>0) downY = {x: cell.x, y: cell.y - 1}

            if(upX.x == position.x && upX.y == position.y && cell.type === 'sealed' && isGoing && isMyTurn) return true
            if(downX.x == position.x && downX.y == position.y && cell.type === 'sealed' && isGoing && isMyTurn) return true
            if(upY.x == position.x && upY.y == position.y && cell.type === 'sealed' && isGoing && isMyTurn) return true
            if(downY.x == position.x && downY.y == position.y && cell.type === 'sealed' && isGoing && isMyTurn) return true
            
        }catch(err){
            return false
        }
    }

    const isMovable = (cell) => {
        try{
            let position = game.turnPieces[game.turn]
            let isMyTurn = game.players[game.turn%game.players.length] == user
            let upX = {x: -1, y: -1}
            let downX = {x: -1, y: -1}
            let upY = {x: -1, y: -1}
            let downY = {x: -1, y: -1}
            if(cell.x<game.board.length-1) upX = {x: cell.x + 1, y: cell.y }
            if(cell.x>0)  downX = {x :cell.x - 1, y: cell.y}
            if(cell.y<game.board.length-1) upY = {x: cell.x, y: cell.y + 1}
            if(cell.y>0) downY = {x: cell.x, y: cell.y - 1}

            if(upX.x == position.x && upX.y == position.y && cell.type !== 'sealed' && isGoing && isMyTurn) return {direction: 'up', ...upX}
            if(downX.x == position.x && downX.y == position.y && cell.type !== 'sealed' && isGoing && isMyTurn) return {direction: 'down', ...downX}
            if(upY.x == position.x && upY.y == position.y && cell.type !== 'sealed' && isGoing && isMyTurn) return {direction: 'left', ...upY}
            if(downY.x == position.x && downY.y == position.y && cell.type !== 'sealed' && isGoing && isMyTurn) return {direction: 'right', ...downY}
            
        }catch(err){
            return false
        }
        
    }

    const invisibleMove = (direction) => {
        socket.emit('invisible move', {direction, user})
    }

    const chantier = (data) => {
        socket.emit('chantier', data)
    }

    const renovation = (data) => {
        socket.emit('renovation', data)
    }

    const move = (direction) => {
        console.log(user)
        socket.emit('move', {direction, user})
    }

    const globeMove = (cell, globe) => {
        socket.emit('globe move', {cell, user, globe})
    }

    const getOrb = (direction) => {
        socket.emit('orb move', {direction, user})
    }

    const transparence = (data) => {
        socket.emit('transparence', data)
    }

    const intracable = (data) => {
        socket.emit('intracable', data)
    }

    const moveBunker = (data) => {
        socket.emit('move bunker', data)
    }

    const breche = (data) => {
        socket.emit('breche', data)
    }

    const isBunker = (cll) => {
        if(bunker.length === 0) return false
        if(bunker.find(b => b.x === cll.x && b.y === cll.y)) return true
        return false
    }

    const isGlobetrottable = (cell) => {
        let position = game.turnPieces[game.turn]
        if(position.x === 0){
            if(cell.x === game.board.length-1 && cell.y === position.y && cell.type !== 'Wall') return true
        }
        if(position.x === game.board.length-1){
            if(cell.x === 0 && cell.y === position.y && cell.type !== 'Wall') return true

        }
        if(position.y === 0){
            if(cell.y === game.board.length-1 && cell.x === position.x && cell.type !== 'Wall') return true

        }
        if(position.y === game.board.length-1){
            if(cell.y === 0 && cell.x === position.x && cell.type !== 'Wall') return true

        }
        return false
    }








    const displayCell = () => {
        let clName = cell.type === 'empty' ? 'Cell' : cell.type === 'special' ? 'Tp' : cell.player === user ? 'Player' : cell.player !== null ? 'Enemy' : cell.type === 'sealed' ? 'Wall' : '' 
        let bomb = false;
        let orb = false;
        
        if(isBunker(cell)){
            clName = 'Bunker'
        }
        if(cell.bomb){
            bomb = true;
        }
        if(cell.type === 'orb'){
            clName = 'Cell';
            orb = true;
        }

        if(place && isPlaceable(cell)){
                return <div className='Cell' onClick={() => placePlayer()}><div className="Playable"></div></div>
            }

        if(game.tp && cell.type === 'special' && game.players[game.turn%game.players.length] === user){
            return (
                <div onClick={() => socket.emit('tp', {x: cell.x, y: cell.y, user})}  className="Special">
                </div>
            )
        }
        if(cell.invisible?.length>10 && cell.invisible !== user){
            if(cell.type === 'player' && isMovable(cell)){
                return <div className='Cell' onClick={() => move(isMovable(cell).direction)}><div className="Playable"></div></div>
            }
            if(clName !== 'Cell'){
                return (
                    <div className="Cell"></div>
                )
            }
            if(isMovable(cell) && !game.tp && cell.type==='orb'){
                return <div className='Cell' onClick={() => getOrb(isMovable(cell).direction)}><div className="Playable"><div className="Orb"></div></div></div>
            }
            if(isMovable(cell) && !game.tp){
                return <div className='Cell' onClick={() => move(isMovable(cell).direction)}><div className="Playable">{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div></div>
            }
            return (
                <div className="Cell"></div>
            )
                
        }
        if(isBunker(cell)){
            return (
                <div className="Bunker"></div>
            )
        }
        switch(game.state){
            case 'normal':
                if(isMovable(cell) && !game.tp && cell.type==='orb'){
                    return <div className={clName} onClick={() => getOrb(isMovable(cell).direction)}><div className="Playable"><div className="Orb"></div></div></div>
                }
                if(isMovable(cell) && !game.tp){
                    return <div className={clName} onClick={() => move(isMovable(cell).direction)}><div className="Playable">{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div>
                )
            case 'breche':
                
                if(isRenovable(cell)){
                    return <div className='Wall' onClick={() => breche({x: cell.x, y:cell.y, user})}><div className="Bonusable"></div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div>
                )
            case 'chantier':
                
                if(game.players[game.turn%game.players.length] === user && isMovable(cell)){
                    return <div className={clName} onClick={() => chantier({x: cell.x, y:cell.y, user})}><div className="Bonusable"></div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div>
                )
            case 'renovation':
                
                if(isRenovable(cell)){
                    return <div className='Wall' onClick={() => renovation({x: cell.x, y:cell.y, user})}><div className="Bonusable"></div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div>
                )
            case 'invisible':
                
                if(game.players[game.turn%game.players.length] === user && isMovable(cell) && (cell.type === 'empty' || cell.type === 'orb')){
                    return <div className='Cell' onClick={() => invisibleMove(isMovable(cell).direction)}><div className="Bonusable">{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div>
                )
            case 'transparence':
                
                if((isRenovable(cell) || isMovable(cell)) && !game.tp){
                    return <div className={clName} onClick={() => transparence({x: cell.x, y:cell.y, user})}><div className="Bonusable">{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div>
                )
            case 'intracable':
                
                if(game.players[game.turn%game.players.length] === user && isMovable(cell) && !game.tp){
                    return <div className={clName} onClick={() => intracable({x: cell.x, y: cell.y, user})}><div className="Bonusable">{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div>
                )
            case 'bunker':
                
                if(game.players[game.turn%game.players.length] === user && isMovable(cell) && !game.tp){
                    return <div className={clName} onClick={() => moveBunker({x: cell.x, y: cell.y, user})}><div className="Bonusable">{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div>
                )
            case 'globe':
                
                if((isGlobetrottable(cell) || isMovable(cell)) && !game.tp){
                    return <div className={clName} onClick={() => globeMove(cell, false)}><div className="Bonusable">{bomb? <div className="Bomb"></div >: orb ? <div className="Orb"></div>: <></>}</div></div>
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: orb? <div className="Orb" ></div> : <></>}</div>
                )
            case 'destroy teleport':
                if(cell.type === 'special' && game.players[game.turn%game.players.length] === user){
                    return(
                        <div onClick={() => socket.emit('destroy teleport', {x: cell.x, y: cell.y, user})} className="Destroy">
                        </div>
                    )
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: <></>}</div>
                )
            case 'teleportation':
                if(cell.type === 'special'){
                    return(
                        <div onClick={() => socket.emit('teleportation', {x: cell.x, y: cell.y, user})} className="Special">
                        </div>
                    )
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: <></>}</div>
                )
            case 'bomb':
                if(cell.type === 'empty'){
                    return(
                        <div onClick={() => socket.emit('bomb', {x: cell.x, y: cell.y, user})} className="Cell">
                        </div>
                    )
                }
                return(
                    <div className={clName}>{bomb? <div className="Bomb"></div >: <></>}</div>
                )
            default:
                break;
            
        }
            
    }















    // if(isBunker(cell)){
    //     return (
    //         <div className="Bunker"></div>
    //     )
    // }

    

//     if(cell.invisible?.length>10 && cell.invisible !== user){
//         console.log('wesh')
//         return (
//             <div className="Cell"></div>
//         )
//     }

//     if(game.state === 'breche' && isRenovable(cell)){
//         return <div className='Wall' onClick={() => breche({x: cell.x, y:cell.y, user})}><div className="Bonusable"></div></div>
// }

//     if(game.state === 'intracable' && game.players[game.turn%game.players.length] === user && isMovable(cell)){
//         const clName = cell.type === 'empty' ? 'Cell' : cell.type === 'special' ? 'Tp' : cell.player === user ? 'Player' : cell.type === 'sealed' ? 'Wall' : 'Enemy'
//         return <div className={clName} onClick={() => intracable({x: cell.x, y: cell.y, user})}><div className="Bonusable"></div></div>
//     }

//     if(game.state === 'transparence' && (isRenovable(cell) || isMovable(cell))){
//         const clName = cell.type === 'empty' ? 'Cell' : cell.type === 'special' ? 'Tp' : cell.player === user ? 'Player' : cell.type === 'sealed' ? 'Wall' : 'Enemy'
//         if(game.state === 'globe'){
//             return <div className={clName} onClick={() => globeMove(cell, false)}><div className="Bonusable"></div></div>
//         }
//         return <div className={clName} onClick={() => transparence({x: cell.x, y:cell.y, user})}><div className="Bonusable"></div></div>
//     }

//     if(game.state === 'bunker' && game.players[game.turn%game.players.length] === user && isMovable(cell)){
//         const clName = cell.type === 'empty' ? 'Cell' : cell.type === 'special' ? 'Tp' : cell.player === user ? 'Player' : cell.type === 'sealed' ? 'Wall' : 'Enemy'
//         return <div className={clName} onClick={() => moveBunker({x: cell.x, y: cell.y, user})}><div className="Bonusable"></div></div>
//     }

    

    

//     if(cell.bomb){
//         if(bunker && cell.player === user){
//             return (
//                 <div className="Bunker"><div className="Bomb"></div></div>
//             )
//         }
//         const clName = cell.type === 'empty' ? 'Cell' : cell.type === 'special' ? 'Tp' : cell.player === user ? 'Player' : cell.type === 'sealed' ? 'Wall' : 'Enemy'
//         if(isMovable(cell) && !game.tp && game.state === 'normal'){
//             return <div className={clName} onClick={() => move(isMovable(cell).direction)}><div className="Playable"><div className="Bomb"></div></div></div>
//         }
//         if(game.state === 'globe' && (isGlobetrottable(cell) || isMovable(cell))){
//             return <div className={clName} onClick={() => globeMove(cell, false)}><div className="Bonusable"><div className="Bomb"></div></div></div>
//         }
//         else return <div className={clName}><div className="Bomb"></div></div>
//     }


//     if(game.state === 'renovation' && isRenovable(cell)){
//         return <div className='Wall' onClick={() => renovation({x: cell.x, y:cell.y, user})}><div className="Bonusable"></div></div>
//     }

//     if(game.state === 'chantier' && cell.type === 'empty' && isMovable(cell)){
//         return <div className='Cell' onClick={() => chantier({x: cell.x, y:cell.y, user})}><div className="Bonusable"></div></div>
//     }

//     if(game.state === 'invisible' && game.players[game.turn%game.players.length] === user && isMovable(cell) && cell.type === 'empty'){
//         return <div className='Cell' onClick={() => invisibleMove(isMovable(cell).direction)}><div className="Bonusable"></div></div>
//     }

//     if(game.state === 'globe' && (isGlobetrottable(cell) || isMovable(cell))){
//         if(cell.type === 'orb'){
//             return <div className='Cell' onClick={() => globeMove(cell, true)}><div className="Orb"></div><div className="Bonusable"></div></div>
//         }
//         const clName = cell.type === 'empty' ? 'Cell' : cell.type === 'special' ? 'Tp' : cell.player === user ? 'Player' : 'Enemy'
//         return <div className={clName} onClick={() => globeMove(cell, false)}><div className="Bonusable"></div></div>
//     }

//     if(cell.type === 'special' && game.tp && game.players[game.turn%game.players.length] === user){
//         return (
//             <div onClick={() => socket.emit('tp', {x: cell.x, y: cell.y, user})}  className="Special">
//             </div>
//         )
//     }

//     if(game.state === 'destroy teleport' && game.players[game.turn%game.players.length] === user && cell.type === 'special'){
//         return(
//             <div onClick={() => socket.emit('destroy teleport', {x: cell.x, y: cell.y, user})} className="Destroy">

//             </div>
//         )
//     }

//     if(game.state === 'teleportation' && cell.type === 'special' && game.players[game.turn%game.players.length] === user ){
//         return(
//             <div onClick={() => socket.emit('teleportation', {x: cell.x, y: cell.y, user})} className="Special">

//             </div>
//         )
//     }

//     if(game.state === 'bomb' && cell.type === 'empty' && game.players[game.turn%game.players.length] === user){
//         return(
//             <div onClick={() => socket.emit('bomb', {x: cell.x, y: cell.y, user})} className="Cell">

//             </div>
//         )
//     }

    


//     if(isMovable(cell) && !game.tp && game.state === 'normal'){
//         if(cell.type === 'orb'){
//             return <div className='Cell' onClick={() => getOrb(isMovable(cell).direction)}><div className="Orb"></div><div className="Playable"></div></div>
//         }
//         const clName = cell.type === 'empty' ? 'Cell' : cell.type === 'special' ? 'Tp' : cell.player === user ? 'Player' : 'Enemy'
//         return <div className={clName} onClick={() => move(isMovable(cell).direction)}><div className="Playable"></div></div>
//     }

//     if(place && isPlaceable(cell)){
//         return <div className='Cell' onClick={() => placePlayer()}><div className="Playable"></div></div>
//     }



//     if(cell.type === 'orb'){
//         return <div className="Cell"><div className="Orb"></div></div>
//     }

//     if(cell.type === 'player' && cell.player !== user){
//         return (
//             <div className="Enemy">
//             </div>
//         )
//     }

//     if(cell.type === 'player' && cell.player === user){
//         return (
//             <div className="Player">
//             </div>
//         )
//     }

//     if(cell.type === 'sealed'){
//         return (
//             <div className="Wall">
//             </div>
//         )
//     }

//     if(cell.type === 'special'){
//         return (
//             <div className="Tp">
//             </div>
//         )
//     }


//     return (
//         <div className="Cell">
//         </div>
//     )

return displayCell()
}

    

    