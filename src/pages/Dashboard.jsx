import { Navigate, useLoaderData } from "react-router-dom";
import { socket } from "../../socket";
import Bonuses from "../components/Bonuses";
import GameChoices from "../components/GameChoices";
import ListGames from "../components/ListGames";
import { useState } from "react";
// import Computer from "../components/Computer";

export default function Dashboard() {

  const data = useLoaderData()
  const [nav,setNav] = useState(false)

  socket.on('start game', () => {
    setNav(true)
  })

  if(!data.player){
    return <Navigate to='/ProtoPit' />
  }

  if(nav){
    return <Navigate to='/ProtoPit/game' />
  }
  return (
    <div className="Dashboard">
      <h1 className="title">WallPit</h1>
      <GameChoices />
      <Bonuses />
      <ListGames />
      {/* <Computer /> */}
    </div>
  )
}
