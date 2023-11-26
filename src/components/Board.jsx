/* eslint-disable react/prop-types */
import Row from "./Row"

 

export default function Board({game, place, isGoing, bunker, randomMap}) {

   const board = game.board
   const cl = `Board m${randomMap || ''}`

    

  return (
    <div className={cl}>
        {board.map((row, i) => {
            return <Row key={i} row={row} game={game} place={place} isGoing={isGoing} bunker={bunker} />
        })}
    </div>
  )
}