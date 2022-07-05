import React from "react";
import PlayersList from "./components/playersList";
import PlayerCard from "./components/PlayerCard";
import EditProfile from "./components/EditProfile";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

export default function App() {
  return (

        <Router>
            {/*<PlayersList />*/}
            <PlayerCard />

            <Routes>
                <Route path="/card/:id/update" element={<EditProfile/>} />

            </Routes>


        </Router>



  );
}
