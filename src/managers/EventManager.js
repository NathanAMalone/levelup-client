export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getOneEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "POST", 
        body: JSON.stringify(event),
    })
        .then(res => res.json())
}

export const updateEvent = (event, eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "PUT", 
        body: JSON.stringify(event)
    })
        
}

export const joinEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/signup`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        method: "POST", 
        body: JSON.stringify()
    })
        
}

export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        method: "DELETE", 
    })
        
}

export const leaveEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}/leave`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        method: "DELETE", 
    })
}

export const getGames = () => {
    return fetch("http://localhost:8000/games", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then()
}

export const getEventGamers = () => {
    return fetch("http://localhost:8000/eventgamers", { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then()
}