import React from 'react'
import styled from "styled-components"
import { useEffect, useState } from "react";

let ChatComponent=()=>{

    let [msgs, setMsgs] = useState({});

    useEffect(()=>{//Fetch API
        fetch( `http://localhost:8000/api/v1/chat/`)
                .then((response)=>{return response.json()})
                .then((data)=>{
                    setMsgs(data)
                })
                .catch()
                
    },[]);
    let chatPop=()=>{
        console.log(msgs)
      
    }
    return (
        <Container >
            <div onClick={chatPop} className='popup'>
               <p >Chat</p>
            </div>
        </Container>
    )
}

const Container=styled.div`
    float: right;
    .popup{
        display: flex;
        justify-content: center;
        width:75px;
        height: 75px;
        border-radius:50%;
        background-color:blue;
    }
  
`;
export default ChatComponent