import React from "react";
import {Navigate} from "react-router-dom"
import {appContext} from '../../App'
import { useContext } from "react";
let PrivateRoute = ({component:Component})=>{
    let appContextValue = useContext(appContext)   
       if(appContextValue.isLoggedIn){
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