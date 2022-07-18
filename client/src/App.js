import React, { useEffect, useState,createContext } from 'react'
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
import Refresh_token from "./components/auth/refresh_token"



export const appContext = createContext({})
export default function App(){
let [isLoggedIn, setIsLoggedIn] = useState(false)
const [isLoading, setIsLoading] = useState(true)
useEffect(()=>{
const remember_me = localStorage.getItem("REMEMBER_ME")
if(remember_me === "1"){
  Refresh_token()
  setIsLoggedIn(true)
}
setIsLoading(false)
setInterval(intervalFunction,0.5*60*1000)

},[])

const intervalFunction = ()=>{
  if(isLoggedIn){
    console.log('from interval function ');
    Refresh_token()
  }
}
console.log("Is Logged In", isLoggedIn)
  if (isLoading) {
    return null;
  }
  return(
    <div className='' >
    <BrowserRouter>
      <LoginNav/>
      <Nav/>
      <appContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
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
      </appContext.Provider>
      <Footer/>
    </BrowserRouter>
    </div>
  )


}
