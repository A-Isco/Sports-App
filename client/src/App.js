
import React from 'react'
import PlayersList from "./components/playersList";
import  {BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import PlacesList from "./components/placesList";
import ChatComponent from './components/chat/chatcomponent.jsx'
import PlaceDetails from "./components/placeDetails";
import PlacesCreatePage from "./components/PlacesCreatePage";

export default function App(){

  return(
    <BrowserRouter>

      <Routes>
        
      <Route path="/" element={ <PlacesList/> } />
          <Route path="/players" element={ <PlayersList/> } />
      <Route path="/football/places/:placeId" element={ <PlaceDetails/> } />
        <Route path="/chat" element={<ChatComponent />} />
        <Route path = "/football/create-place" element = {< PlacesCreatePage/>}/>

      </Routes>
    </BrowserRouter>

  )

}
