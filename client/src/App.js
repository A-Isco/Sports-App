import React from "react";
import PlayersList from "./components/playersList";
import PlacesList from "./components/placesList";
import {Route, Router, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import PlaceDetails from "./components/placeDetails";
import PlacesCreatePage from "./components/PlacesCreatePage";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
            {/*<PlayersList />*/}

                    <Route path="/" element={ <PlacesList/> } />
                    <Route path="/football/places/:placeId" element={ <PlaceDetails/> } />
                    <Route path="/football/create-place" element={ <PlacesCreatePage/> } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
