const apIurl = "https://fdsafasdf.pythonanywhere.com"

export const register = (userName, password) =>{
    return fetch(`${apIurl}/register/?username=${userName}&pass=${password}`, {method: 'GET'})
}

export const login = (userName, password) =>{
    return fetch(`${apIurl}/login/?username=${userName}&pass=${password}`, {method: 'GET'})
}

export const schedule = () => {
    return fetch(`${apIurl}/schedule`, {method: 'GET'})
}

export const get_tickets = (username, token) => {
    return fetch(`${apIurl}/mytickets/?username=${username}&token=${token}`, {method: 'GET'})
}

export const buy_ticket = (username, token, schedule_id, seat) => {
    return fetch(`${apIurl}/buy?schedule_id=${schedule_id}&token=${token}&username=${username}&seat=${seat}`, {method: 'GET'})

}