import { socket } from "../../socket";

export default function Computer() {
  return (

    <button onClick={socket.emit('play computer')}></button>
  )
}
