export default async function signup(pseudo, email, password) {
    console.log(pseudo, email, password)
    const response = await fetch('http://localhost:5001/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pseudo, email, password })
    })
    const res = await response.json()
    const data = await res
    return data
}