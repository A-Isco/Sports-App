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
import AboutUs from "./pages/about_us"
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
import Chat from "./components/chat/chatcomponent"

import Landing from "./components/landing";
import PaymentCard from "./components/PaymentCard";
import Refresh_token from "./components/auth/refresh_token"
import { createContext, useState ,useEffect } from "react";
import styled from "styled-components"


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

// useEffect(() => {
//   let height = window.innerHeight-212;
//   let cont = document.getElementsByClassName("content")[0];
//   console.log(cont)
//   cont.style.minHeight = String(height+'px');  
// }, []);

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
    
    <Container>
    <div className='' >
    <BrowserRouter>



      <appContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
          <LoginNav/>
          <div className='content'>
      <Routes>
          <Route path="/:Sport/*" element={<PrivateRoute component={Landing}/>} />

      <Route path="/card" element={<PrivateRoute component={PlayerProfile}/>} />
      <Route path="/card/update" element={<PrivateRoute component={EditProfile}/>} />
      <Route path='/login'element={<GuestRoute component={Login}/>}/>
     <Route path='/signup' element={<GuestRoute component={Signup}/>}/>
     <Route path='/logout' element={<PrivateRoute component={Logout}/>}/>
     <Route path=''element={<Home/>}/>
     <Route path='/home'element={<Home/>}/>
      <Route path='/charge' element={<PaymentCard/>}/>
      {/* <Route path="/about-us" element={<AboutUs />} /> */}






      <Route path='/test' element={<PrivateRoute component={Test}/>}/>

     <Route path='*'element={<NotFound/>}/>



      <Route path="/chat" element={<PrivateRoute component={ChatComponent} />} />




      <Route path='*'element={<NotFound/>}/>

      </Routes>
      </div>
      </appContext.Provider>
      
      <Footer/>
    </BrowserRouter>
    </div>
    </Container>
   
  )


}
const Container = styled.div`
.content{
  min-height: 780px
}
`

