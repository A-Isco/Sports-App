import React from 'react'
import PlayersList from "./components/playersList";
import  {BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import PlacesList from "./components/placesList";
import PlayerProfile from "./components/playerProfile";
import EditProfile from "./components/EditProfile";
import TestProfile from "./components/TestProfile";
import ChatComponent from './components/chat/chatcomponent.jsx'
import PlaceDetails from "./components/placeDetails";
import  Login  from './components/auth/login';
import Logout from './components/auth/logout';
import GuestRoute from './components/auth/guestRoute';
import PrivateRoute from './components/auth/privateRoute';
import Signup from './components/auth/signup';
// import Home from './components/home';
import NotFound from './components/notFound';
import Test from './components/auth/test'
import Home from './pages/home/home'
import LoginNav from "./components/core/newLogBar"
import Nav from "./components/core/newHomeBar"
import Footer from "./components/core/footer"
export default function App(){

  return(
    <div className='' >
    <BrowserRouter>
      <LoginNav/>
      <Nav/>
      <Routes>
      <Route path="/card" element={<PlayerProfile/>} />
      <Route path="/card/update" element={<EditProfile/>} />
      <Route path='/login'element={<GuestRoute component={Login}/>}/>
     <Route path='/signup' element={<GuestRoute component={Signup}/>}/>
     <Route path='/logout' element={<PrivateRoute component={Logout}/>}/>
     <Route path=''element={<Home/>}/>
     <Route path='/home'element={<Home/>}/>
     
      <Route path="/places" element={<PrivateRoute component={PlacesList}/>} />
          <Route path="/players" element={<PrivateRoute component={PlayersList}/>} />
      <Route path="/football/places/:placeId" element={<PrivateRoute component={PlaceDetails}/>} />
      <Route path="/chat"   element={<PrivateRoute component={ChatComponent}/>}/>
      <Route path='/test' element={<PrivateRoute component={Test}/>}/>
      <Route path='*'element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )


}
