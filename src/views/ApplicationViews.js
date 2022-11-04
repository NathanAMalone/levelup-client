import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/events/EventForm"
import { EventList } from "../components/events/EventList"
import { UpdateGameForm } from "../components/game/UpdateGame"
import { UpdateEventForm } from "../components/events/UpdateEvent"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games" element={<GameList />} />
                <Route path="/updateGames/:gameId" element={<UpdateGameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/updateEvents/:eventId" element={<UpdateEventForm />} />

            </Route>
        </Routes>
    </>
}
