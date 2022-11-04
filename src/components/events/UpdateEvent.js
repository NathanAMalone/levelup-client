import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getOneEvent } from "../../managers/EventManager.js"
import { createGame, getOneGame, updateGame } from '../../managers/GameManager.js'


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
        organizer: 0
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
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <input type="text" id="organizer.user.username" required autoFocus className="form-control"
                        value={currentEvent.organizer.user?.username}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="number" id="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="number" id="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="number" id="time" required autoFocus className="form-control"
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

                    const game = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.gameId),
                        organizer: parseInt(currentEvent.organizerId)
                    }

                    // Send POST request to your API
                    updateGame(game, eventId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}