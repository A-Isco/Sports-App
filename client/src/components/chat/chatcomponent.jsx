import React from 'react'
import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from "axios";

let ChatComponent=()=>{

    let [contacts, setContacts] = useState([]);
    let [currentChat, setCurrentChat] = useState([]);

    useEffect(()=>{//Fetch API
      let id=String(sessionStorage.getItem('id'))
        fetch( `http://localhost:8000/api/v1/chat/contacts/${id}`)
                .then((response)=>{return response.json()})
                .then((data)=>{
                  setContacts(data)
                })
                .catch()
                
    },[]);
    function getChatMessages(chat_id){
      fetch( `http://localhost:8000/api/v1/message/${chat_id}`)
      .then((response)=>{return response.json()})
      .then((data)=>{
        setCurrentChat(data)
      })
      .catch()
      
    }

    let sendMessage=()=>{

    }
 
    let chatPop= ()=>{
        var popup = document.getElementById("myPopup");
        if(popup.className=='container') {
          popup.className='popup'
        }
        else{ 
          popup.className='container'

      }
    }
    return (
      <>
      <Container>
        <div   id='popupIcon'  onClick={chatPop} >
               <p >Chat</p>
        </div>
        <div id='myPopup' className="popup">
                  <div className="contacts">
                                {
                          contacts.map((item) => (
                            <div className='contact' onClick={()=>{getChatMessages(item.chat)}} key={item.chat} >
                            <h1  >{item.player.name}</h1>

                          </div>
                        ))}
              
                  </div>  
                  <div className='chatContent'>
                            <div className='messages'>
                                        {
                                      currentChat.map((item) => 
                                      {
                                        let id=String(sessionStorage.getItem('id'))
                                        let msgType
                                        if(item.from==id) msgType='yours'
                                        else msgType='notYours'
                                        return (  <div className={msgType} key={item._id} >
                                                <h5  >{item.message}</h5>
                                                
                                                </div>
                                                
                                      )
                                      }
                                    )}
                                    
                                    
                                                        
                              
                    </div>
                            <div className='sendTools'>
                              <input  className='inputsend' type='text'/>
                              <button onClick={()=>{sendMessage()}}>send</button>
                            </div>
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
    cursor: pointer;
   
  }
  .popup{
         visibility: hidden;
   }
  .container {
    height: 75vh;
    width: 65vw;
    background-color:#131324;
    display: flex;
    border-radius:5%;
    flex-direction: row-reverse; 
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  .contacts{
    height: 75vh;
    width: 25vw;
    border-left-style: solid;
    text-align:center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff99;
        width: 0.1rem;
        border-radius: 1rem;
      }
    
  }}
  .contact{
    height: 10vh;
    display: flex;
    border-radius:20%;
    background-color:#ffffff34;
    margin-top:5px;
    margin-left:5px;
    align-items: center;
    text-align:center;
    justify-content: center;
    transition: 0.5s ease-in-out;
    cursor: pointer;
    h1{
      color:white;
    }
  }
  
  .chatContent{
    height: 75vh;
    width: 35vw;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
}
 
    
  }
  .sendTools{
    border-top-style: solid;
    text-align:center;
    position: fixed;
    top: 82%;
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    display:flex;
    width:35vw;
    input {
      width: 100%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
.messages{
  padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

}
.yours{
  overflow: auto;
  position:relative;
  left:0%;
  width:50%;
  margin:10px;
  background-color: blue;
  border-radius: 10px;
  text-align:center;
  align-items: center;
  h5{
    color:white;
  }

}
.notYours{
  overflow: auto;
  position:relative;
  left:50%;
  width:50%;
  margin:10px;
  background-color: gray;
  border-radius: 10px;
  text-align:center;
  h5{
    color:black ;
  }

}
 
  
`;


export default ChatComponent