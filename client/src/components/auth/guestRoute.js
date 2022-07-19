import React from "react";
import {Navigate} from "react-router-dom"
import {appContext} from '../../App'
import { useContext} from "react";
let GuestRoute = ({component:Component})=>{
    let appContextValue = useContext(appContext)
    console.log('from guest route');
    console.log(appContextValue.isLoggedIn);
       if(appContextValue.isLoggedIn){
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