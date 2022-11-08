import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager.js"
import { deleteGame, getGames } from "../../managers/GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <header>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        navigate({ pathname: "/games/new" })
                    }}
                >Register New Game</button>
            </header>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">
                            <Link to={`/updateGames/${game.id}`} className="editLink">{game.title}
                            </Link> by {game.maker}
                        </div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button type="submit"
                            onClick={evt => {
                             // Prevent form from being submitted
                            evt.preventDefault()

                            // Send POST request to your API
                            deleteGame(game.id)
                                .then(() => window.location.reload())
                            }}
                            className="btn btn-primary">Delete</button>
                    </section>
                })
            }
        </article>
    )
}