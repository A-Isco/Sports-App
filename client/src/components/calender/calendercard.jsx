import React from 'react'
import styled from "styled-components"
import { useEffect, useState,useRef } from "react";
import Navbar from "../core/newHomeBar";

let CalenderCard=({event})=>{
console.log(event)
    return (
        <>
                
                <Container>
                
                    <div class="card">
                    <img class="card-img-top" src={event.place.profile[0]} alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">{event.place.name}</h5>
                        <h5 class="card-title">{event.date}</h5>
                        <h5 class="card-title">From:{event.time.from}  To:{event.time.to}</h5>
                    </div>
                    </div>
                </Container>
        </>
   
    )
}
const Container = styled.div`

.card{
    width: 20rem;
    margin:40px;
    background-color:#759cd0;
    h5{
        color:white;
    }
}

`

export default CalenderCard
