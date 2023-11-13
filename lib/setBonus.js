export default async function setBonus(user, bonus) {
    console.log(bonus)
    await fetch(`https://protoback-6f97af5b8a65.herokuapp.com/api/user/${user}/bonus`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('sptoken')
        },
        body: JSON.stringify({bonus})
    })
}