import { useState } from "react"
import setBonus from "../../lib/setBonus"

export default function Bonuses() {
    const user = localStorage.getItem('sptuser')
    const [cap, setCap] = useState('artificier')

    const handleClick = (e) => {
        e.preventDefault()
        setBonus(user, cap)
    }


  return (
    <form className="Bonuses">
        <h2>Bonuses : </h2><br/>
        <select value={cap} onChange={ e => setCap(e.target.value) }>
            <option value="artificier">Artificier</option>
            <option value="marcheur">Marcheur temporel</option>
            <option value="fugitif">Fugitif</option>
            <option value="architecte">Architecte</option>
            <option value="banshee">Banshee</option>
            <option value="voyageuse">Voyageuse</option>
            <option value="illusioniste">Illusioniste</option>
        </select> <br/>
        <button type='submit' onClick={e => handleClick(e)}>set Bonuses</button>
    </form>
  )
}
