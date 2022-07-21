import React from "react";
import {Navigate} from "react-router-dom"
import {appContext} from '../../App'
import { useContext } from "react";
let AdminRoute = ({component:Component})=>{

    if((localStorage.getItem('admin') === "true")){
        return(
            <Component   />
        )

    }else{
        return (
            <Navigate to={'/notfound'}/>
        )
    }


}
export default AdminRoute