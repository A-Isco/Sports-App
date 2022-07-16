import React from "react";
import {Navigate} from "react-router-dom"

let PrivateRoute = ({component:Component})=>{
    let token =  localStorage.getItem("sports_token")

       
       if(token){
        return(
        <Component   /> 
        )
        
       }else{
           return (
            <Navigate to={'/login'}/>
           )
    }


}
export default PrivateRoute