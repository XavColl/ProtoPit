export default async function getUser(id) {
    const response = await fetch('http://localhost:5001/api/user/' + id, {
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