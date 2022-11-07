import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"

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
                    const eventId = evt.id
                    return <section key={`event--${evt.id}`} className="event">
                        <div className="event__date">
                            <Link to={`/updateEvents/${evt.id}`} className="editLink">{evt.date}
                            </Link> by {evt?.organizer?.user?.username}</div>
                        <div className="event__time">Starts at {evt.time}</div>
                        <div className="event__title">Title: {evt.game.title}</div>
                        <div className="event__description">Description: {evt.description}</div>
                        <div className="event__description">Who will be there: {evt?.gamers?.user?.username}</div>
                        {
                            evt.joined
                            ?<button type="submit"
                                 onClick={evt => {
                                 // Prevent form from being submitted
                                 evt.preventDefault()
     
                                 // Send POST request to your API
                                 leaveEvent(eventId)
                                    .then(() => { getEvents() 
                                        .then(data => setEvents(data))
                                    })
                         }}
                            className="btn btn-primary">Leave Event</button>
                            :<button type="submit"
                                onClick={evt => {
                                // Prevent form from being submitted
                                evt.preventDefault()

                                // Send POST request to your API
                              joinEvent(eventId)
                                    .then(() => { getEvents()
                                        .then(data => setEvents(data))
                                    })
                         }}
                            className="btn btn-primary">Join Event</button>
     
                         }
                    </section>
                })
            }
        </article>
    )
}