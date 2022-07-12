import React from 'react'
import PlayersList from "./components/playersList";
import  {BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import PlacesList from "./components/placesList";
import PlayerProfile from "./components/playerProfile";
import EditProfile from "./components/EditProfile";
import TestProfile from "./components/TestProfile";
import ChatComponent from './components/chat/chatcomponent.jsx'
import PlaceDetails from "./components/placeDetails";

export default function App(){

  return(
    <BrowserRouter>

      <Routes>
      <Route path="/card/:id" element={<PlayerProfile/>} />
      <Route path="/card/:id/update" element={<EditProfile/>} />
      <Route path="/" element={ <PlacesList/> } />
      <Route path="/players" element={ <PlayersList/> } />
      <Route path="/football/places/:placeId" element={ <PlaceDetails/> } />
      <Route path="/chat" element={<ChatComponent/>}/>
      </Routes>
    </BrowserRouter>

  )


}
