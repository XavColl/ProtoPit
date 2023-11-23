import { useState } from "react"
import setBonus from "../../lib/setBonus"

export default function Bonuses() {
    const user = localStorage.getItem('sptuser')
    const [firstBonus, setFirstBonus] = useState('teleportation')
    const [secondBonus, setSecondBonus] = useState('globe')

    const handleClick = (e) => {
        e.preventDefault()
        setBonus(user, [firstBonus, secondBonus])
    }


  return (
    <form className="Bonuses">
        <h2>Bonuses : </h2><br/>
        <select value={firstBonus} onChange={ e => setFirstBonus(e.target.value) }>
            <option value="teleportation">Téléportation</option>
            <option value="globe">Globe-Trotteur</option>
            <option value="bombe">Bombe à retardement</option>
            <option value="bunker">Bunker</option>
            <option value="chantier">Chantier</option>
            <option value="renovation">Rénovation</option>
            <option value="invisibilite">Invisibilité</option>
            <option value="transparence">Transparence</option>
            <option value="intracable">Intraçable</option>
            <option value="breche">Brèche</option>
            <option value="exil">Exil</option>
            <option value="escale">Escale</option>
            <option value="mimetisme">Mimétisme</option>
            <option value="clonage">Clônage</option>
        </select>
        <select value={secondBonus} onChange={ e => setSecondBonus(e.target.value) }>
        <option value="teleportation">Téléportation</option>
            <option value="globe">Globe-Trotteur</option>
            <option value="bombe">Bombe à retardement</option>
            <option value="bunker">Bunker</option>
            <option value="chantier">Chantier</option>
            <option value="renovation">Rénovation</option>
            <option value="invisibilite">Invisibilité</option>
            <option value="transparence">Transparence</option>
            <option value="intracable">Intraçable</option>
            <option value="breche">Brèche</option>
            <option value="exil">Exil</option>
            <option value="escale">Escale</option>
            <option value="mimetisme">Mimétisme</option>
            <option value="clonage">Clônage</option>
        </select><br/>
        <button type='submit' onClick={e => handleClick(e)}>set Bonuses</button>
    </form>
  )
}
