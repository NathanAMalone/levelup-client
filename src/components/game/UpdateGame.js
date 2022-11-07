import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createGame, deleteGame, getOneGame, updateGame } from '../../managers/GameManager.js'


export const UpdateGameForm = () => {
    const navigate = useNavigate()
    const {gameId} = useParams()

    

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 0,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getOneGame(gameId).then(data => setCurrentGame(data))
    }, [gameId])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
            const copy = {...currentGame}
            const propertyToModify = domEvent.target.id
            copy[propertyToModify] = domEvent.target.value
            setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" id="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" id="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" id="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type.id">Game Type: </label>
                    <input type="number" id="game_type" required autoFocus className="form-control"
                        value={currentGame.game_type}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game, gameId)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Update</button>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    // Send POST request to your API
                    deleteGame(gameId)
                        .then(() => navigate("/games"))
            }}
                className="btn btn-primary">Delete</button>
        </form>
    )
}