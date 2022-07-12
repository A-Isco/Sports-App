
import React from 'react'
import PlayersList from "./components/playersList";
import  {BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import PlacesList from "./components/placesList";
import ChatComponent from './components/chat/chatcomponent.jsx'
import PlaceDetails from "./components/placeDetails";
import  Login  from './components/auth/login';
import Logout from './components/auth/logout';
import GuestRoute from './components/auth/guestRoute';
import PrivateRoute from './components/auth/privateRoute';
import Signup from './components/auth/signup';
import Home from './components/home';
import NotFound from './components/notFound';
export default function App(){

  return(
    <BrowserRouter>

      <Routes>
      <Route path='/login'element={<GuestRoute component={Login}/>}/>
     <Route path='/signup' element={<GuestRoute component={Signup}/>}/>
     <Route path='/logout' element={<PrivateRoute component={Logout}/>}/>
     <Route path=''element={<Home/>}/>
     <Route path='/home'element={<PrivateRoute component={Home}/>}/>

     <Route path='*'element={<NotFound/>}/>
      <Route path="/" element={ <PlacesList/> } />
          <Route path="/players" element={ <PlayersList/> } />
      <Route path="/football/places/:placeId" element={ <PlaceDetails/> } />
      <Route path="/chat" element={<ChatComponent/>}/>
      </Routes>
    </BrowserRouter>

  )

}
