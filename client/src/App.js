import React from 'react'
import PlayersList from "./components/playersList";
import  {BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import PlacesList from "./components/placesList";
import PlayerProfile from "./components/playerProfile";
import EditProfile from "./components/EditProfile";
import TestProfile from "./components/TestProfile";
import ChatComponent from './components/chat/chatcomponent.jsx'
import PlaceDetails from "./components/placeDetails";
import PlacesCreatePage from "./components/PlacesCreatePage";
import PlacesEditPage from "./components/placesEditPage";

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
import Landing from "./components/landing";
import PaymentCard from "./components/PaymentCard";
export default function App(){

  return(
    <div className='' >
    <BrowserRouter>
      <LoginNav/>

      <Routes>
          <Route path="/:Sport/*" element={<PrivateRoute component={Landing}/>} />
          {/*<Route path=":Sport/players" element={<PrivateRoute component={PlayersList}/>} />*/}
      <Route path="/card" element={<PrivateRoute component={PlayerProfile}/>} />
      <Route path="/card/update" element={<PrivateRoute component={EditProfile}/>} />
      <Route path='/login'element={<GuestRoute component={Login}/>}/>
     <Route path='/signup' element={<GuestRoute component={Signup}/>}/>
     <Route path='/logout' element={<PrivateRoute component={Logout}/>}/>
     <Route path=''element={<Home/>}/>
     <Route path='/home'element={<Home/>}/>
          <Route path='/charge' element={<PaymentCard/>}/>






      <Route path='/test' element={<PrivateRoute component={Test}/>}/>

     <Route path='*'element={<NotFound/>}/>
      <Route path="/" element={ <PlacesList/> } />


        <Route path="/chat" element={<ChatComponent />} />




      <Route path='*'element={<NotFound/>}/>

      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )


}
