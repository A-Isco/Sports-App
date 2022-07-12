import React from "react";
import PlayersList from "./components/playersList";
import PlayerProfile from "./components/playerProfile";
import EditProfile from "./components/EditProfile";
import TestProfile from "./components/TestProfile";

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
            {/*<PlayerProfile />*/}
            {/*<TestProfile></TestProfile>*/}

            <Routes>
                <Route path="/card/:id" element={<PlayerProfile/>} />
                <Route path="/card/:id/update" element={<EditProfile/>} />

            </Routes>


        </Router>



  );
}
