export default async function setBonus(user, bonus) {
    console.log(bonus)
    await fetch(`http://localhost:5001/api/user/${user}/bonus`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('sptoken')
        },
        body: JSON.stringify({bonus})
    })
}