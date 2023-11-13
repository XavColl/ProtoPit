export default async function login(email, password) {
    const response = await fetch('https://protoback-6f97af5b8a65.herokuapp.com/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password })
    })
    const data = await response.json()
    localStorage.setItem('sptoken', data.token)
    localStorage.setItem('sptuser', data.userId)
}