import React from 'react'
import styled from "styled-components"
import { useEffect, useState,useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import Navbar from "../core/newHomeBar";

let ChatComponent=()=>{
    let socket = useRef();
    let [contacts, setContacts] = useState([]);
    let [currentChat, setCurrentChat] = useState([]);
    let [currentContact, setCurrenContact] = useState();
    let [currentId, setCurrentId] = useState('');
    let [sendedMessage, setMessage] = useState('');

   

    useEffect(()=>{
      let token=String(localStorage.getItem('sports_token'))
      var id
      
        fetch( `http://localhost:4000/api/v1/chat/contacts/`,{
          headers: {
            authorization:`token ${token}`
          }
        })
                .then((response)=>{return response.json()})
                .then((data)=>{
                      id=data.id
                      setCurrentId(id)
                  setContacts(data.tabs)
                  socket.current = io('http://localhost:4000',{
                    headers: {
                      authorization:`token ${token}`
                    }
                  });
                  
                  socket.current.emit("add-user",id);
                })
                .catch()
                

            
             
                
    },[]);

    useEffect(() => {
      if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          const msgs = [...currentChat];
          msgs.push({ fromSelf: true,...msg });
          setCurrentChat(msgs);
        }); 
      }
      
    }, [currentChat]);
    
    function getChatMessages(item){
      let token=String(localStorage.getItem('sports_token'))
      setCurrenContact(item)
      fetch( `http://localhost:4000/api/v1/message/${item.chat}`,{
        headers: {
          authorization:`token ${token}`
        }
      })
      .then((response)=>{return response.json()})
      .then((data)=>{
        setCurrentChat(data)
      })
      .catch()
      
    }

    let sendMessage=async()=>{
      let token=String(localStorage.getItem('sports_token'))
      if(typeof currentContact != "undefined" && sendedMessage != ''){
            let messageToBeSend={
              message:sendedMessage,
              to:currentContact.player._id,
              chat:currentContact.chat
            }
          
            
            const res = await axios.post(
              `http://localhost:4000/api/v1/message/`,messageToBeSend,{
                headers: {
                  authorization:`token ${token}`
                }
              }
            );
            if(res.data.status==true){ 
              socket.current.emit("send-msg",res.data.message );
              currentChat.push(res.data.message)
              setCurrentChat(currentChat)
              setMessage('')
           


            }
           
          }

    }

    let setHeader=()=>{
                         if(typeof currentContact != "undefined")  return (<div className="d-flex justify-content-start flex-row align-items-center"><img src={`http://localhost:4000/${currentContact.player.img}`} alt={currentContact.player.name}  className="rounded-circle" width="50" height="50"/>
            <h1 className="m-2 text-light" >{currentContact.player.name}</h1>
        </div>)
    }
    let chatPop= ()=>{
        var popup = document.getElementById("myPopup");
        if(popup.className=='container1') {
          popup.className='popup'
        }
        else{ 
          popup.className='container1'

      }
    }
    return (
      <>
          <Navbar/>
      <Container>

        
        {/* <div   id='popupIcon'  onClick={chatPop} >
               <p >Chat</p>
        </div> */}
        <div id='myPopup' className="container1">
                  <div className="contacts">
                                {
                          contacts?.map((item) => (
                            <div className='contact d-flex justify-content-start m-3' onClick={()=>{getChatMessages(item)}} key={item.chat} >


                                <img src={`http://localhost:4000/${item.player?.img}`} alt={item.player?.name}  className="rounded-circle m-2" width="50" height="50"/>
                                <h1 className="m-2" >{item.player?.name}</h1>

                          </div>
                        ))}
              
                  </div>
            <div>
                  <div className='chatHeader'>
                    {setHeader()}
                  </div>
                  <div className='chatContent'>
                    
                            <div className='messages'>
                                        {
                                          currentChat.map((item) => 
                                          {
                                            let id=currentId
                                            let msgType
                                            if(item.from===id) msgType='yours'
                                            else msgType='notYours'
                                            return (  <div className={msgType} key={item._id} >
                                                    <h5  >{item.message}</h5>
                                                    
                                                    </div>
                                                    
                                          )
                                          }
                                    )}
        
                    </div>
                        
              </div>
              <div className='sendTools'>
                              <input   onChange={(e)=>{setMessage(e.target.value)}} value={sendedMessage} className='inputsend' type='text'/>
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
  .container1 {
    height: 85vh;
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
  .chatHeader{
    padding:5px;
    margin:1px;
    position: absolute; 
    left: 20%;
    text-align:center;
    border-bottom-style: solid;
    // background-color:#fffffff4;
    width: 35vw;
    // height:10px;
    h3{
      color:white;
    }
  }
  .chatContent{
    margin-top:55px;
    height: 75vh;
    width: 35vw;
    overflow-y: auto;
    overflow-x:hidden;
    position:relative;
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
    position: absolute; 
    bottom: 0%; left: 20%;
    // top: 82%;
    // width: 100%;
    border-radius: 2rem;
    // display: flex;
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
     padding: 1rem 0rem  7rem 0rem; 
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    overflow-x:hidden;

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
  margin-bottom: 50px;
  background-color: gray;
  border-radius: 10px;
  text-align:center;
  h5{
    color:black ;
  }

}
 
  
`;


export default ChatComponent