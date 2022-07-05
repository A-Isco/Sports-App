import React from 'react'
import  {BrowserRouter,Route,Routes } from 'react-router-dom'
import ChatComponent from './components/chat/chatcomponent'
export default function App(){

  return(
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<ChatComponent/>}/>
      </Routes>
    </BrowserRouter>

  )
}
