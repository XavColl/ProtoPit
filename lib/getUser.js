export default async function getUser(id) {
    const response = await fetch('https://protoback-6f97af5b8a65.herokuapp.com/api/user/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('sptoken')
        }
    })
    const res = await response.json()
    const data = await res
    return data
}