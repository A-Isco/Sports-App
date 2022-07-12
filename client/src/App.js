
import React from 'react'
import PlayersList from "./components/playersList";
import  {BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import PlacesList from "./components/placesList";
import ChatComponent from './components/chat/chatcomponent.jsx'
import PlaceDetails from "./components/placeDetails";

export default function App(){

  return(
    <BrowserRouter>

      <Routes>
        
      <Route path="/" element={ <PlacesList/> } />
      <Route path="/football/places/:placeId" element={ <PlaceDetails/> } />
      <Route path="/chat" element={<ChatComponent/>}/>
      </Routes>
    </BrowserRouter>

  )

}
