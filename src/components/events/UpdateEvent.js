import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { deleteEvent, getOneEvent, updateEvent } from "../../managers/EventManager.js"


export const UpdateEventForm = () => {
    const navigate = useNavigate()
    const {eventId} = useParams()

    

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        description: "",
        date: "",
        time: "",
        game: {
            title: ""
        },
        organizer: {
            user: {
                username: "",
            }
        }
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getOneEvent(eventId).then(data => setCurrentEvent(data))
    }, [eventId])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
            const copy = {...currentEvent}
            const propertyToModify = domEvent.target.id
            copy[propertyToModify] = domEvent.target.value
            setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <input type="text" id="game.title" required autoFocus className="form-control"
                        value={currentEvent.game.title}
                        onChange={
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.game.title = evt.target.value
                                setCurrentEvent(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <input type="text" id="organizer.user.username" required autoFocus className="form-control"
                        value={currentEvent.organizer.user.username}
                        onChange={
                            (evt) => {
                                const copy = {...currentEvent}
                                copy.organizer.user.username = evt.target.value
                                setCurrentEvent(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" id="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" id="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" id="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState} 
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: currentEvent.game,
                        organizer: currentEvent.organizer
                    }

                    // Send POST request to your API
                    updateEvent(event, eventId)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    // Send POST request to your API
                    deleteEvent(eventId)
                        .then(() => navigate("/events"))
            }}
                className="btn btn-primary">Delete</button>
        </form>
    )
}