import { Navigate, useLoaderData } from "react-router-dom";
import { socket } from "../../socket";
import Bonuses from "../components/Bonuses";
import GameChoices from "../components/GameChoices";
import ListGames from "../components/ListGames";
import { useState } from "react";

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
      <GameChoices />
      <Bonuses />
      <ListGames />
    </div>
  )
}
