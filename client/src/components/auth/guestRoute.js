import React from "react";
import {Navigate} from "react-router-dom"

let GuestRoute = ({component:Component})=>{
    let token =  localStorage.getItem("sports_token")

       
       if(token){
        return(
            <Navigate to={'/home'}/>
        )
        
       }else{
           return (
            <Component   /> 
            
           )
    }


}
export default GuestRoute