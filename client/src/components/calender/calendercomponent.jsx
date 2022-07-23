import React from 'react'
import styled from "styled-components"
import { useEffect, useState,useRef } from "react";
import Navbar from "../core/newHomeBar";
import CalenderCard from "../calender/calendercard"
let CalenderComponent=()=>{

    let [reservations, setReservations] = useState();

    useEffect(()=>{
        let token=String(localStorage.getItem('sports_token'))
        fetch( `http://localhost:4000/api/v1/reservation/calender/`,{
            headers: {
              authorization:`token ${token}`
            }
          })
            .then((response)=>{return response.json()})
            .then((data)=>{
                
                setReservations(data.reservedOpponents)
            })

                })
                let renderReservations=()=>{
                   if( typeof reservations != "undefined"){
                    console.log('data:')
                        console.log(reservations)
                        return(    reservations.map((item) => (
                                <CalenderCard event={item}></CalenderCard>
                            )))
                   }
                }

    return (
        <>
                <Navbar/>
                <Container>
                    <div className="d-flex justify-content-start min-vh-100 flex-wrap ">
                {
                       renderReservations()
                        }
                    </div>
                </Container>
        </>
   
    )
}
const Container = styled.div`

display: flex;
flex-direction: row;
`

export default CalenderComponent