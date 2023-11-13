/* eslint-disable react/prop-types */
import Row from "./Row"

 

export default function Board({game, place, isGoing, bunker}) {

   const board = game.board

    

  return (
    <div className="Board">
        {board.map((row, i) => {
            return <Row key={i} row={row} game={game} place={place} isGoing={isGoing} bunker={bunker} />
        })}
    </div>
  )
}