/* eslint-disable react/prop-types */

import Cell from "./Cell"

export default function Row({row, game, place, isGoing, bunker, invisible}) {


  return (

    
    <div className="Row">
        {row.map((cell, i) => {
            return <Cell key={i} cell={cell} game={game} place={place} isGoing={isGoing} bunker={bunker} invisible={invisible} />
        })}
    </div>
  )
}