import React from 'react'
import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from "axios";

let ChatComponent=()=>{

    let [contacts, setContacts] = useState([]);

    useEffect(()=>{//Fetch API
      let id=String(sessionStorage.getItem('id'))
      console.log(id)
        fetch( `http://localhost:8000/api/v1/chat/contacts/${id}`)
                .then((response)=>{return response.json()})
                .then((data)=>{
                  setContacts(data)
                })
                .catch()
                
    },[]);
 
    let renderContacts=()=>{
      // return {contacts}
    }
    let chatPop= ()=>{
      console.log(contacts[0].chat)
        var popup = document.getElementById("myPopup");
        if(popup.className=='container') {
          popup.className='show'
        }
        else popup.className='container'
    }
    return (
      <>
      <Container>
        <div   id='popupIcon'  onClick={chatPop} >
               <p >Chat</p>
          </div>
        <div id='myPopup' className="show">
            <div className="cont">
            {renderContacts()}
            </div>
          <div>

          </div>
      
        </div>
      </Container>
    </>
   
    )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  #popupIcon{
    position:absolute;
    bottom:10px;
    right:10px;
    text-align:center;
    justify-content: center;
    width:75px;
    height: 75px;
    border-radius:50%;
    background-color:blue;
   
  }
  .popup{
         visibility: hidden;
   }
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;


export default ChatComponent