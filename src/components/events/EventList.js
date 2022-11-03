import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <header>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        navigate({ pathname: "/events/new" })
                    }}
                >Register New Event</button>
            </header>
            {
                events.map(evt => {
                    return <section key={`event--${evt.id}`} className="event">
                        <div className="event__date">{evt.date} by {evt?.organizer?.user?.username}</div>
                        <div className="event__time">Starts at {evt.time}</div>
                        <div className="event__title">Title: {evt.game.title}</div>
                        <div className="event__description">Description: {evt.description}</div>
                        <div className="event__description">Who will be there: {evt?.gamers?.user}</div>
                    </section>
                })
            }
        </article>
    )
}