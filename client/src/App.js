import React from "react";
import PlayersList from "./components/playersList";
import PlacesList from "./components/placesList";
import {Route, Router, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
            {/*<PlayersList />*/}

                    <Route path="/" element={ <PlacesList/> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
