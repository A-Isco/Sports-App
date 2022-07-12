import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

let Login = ()=>{
let navigation = useNavigate()
let [email, setEmail] = useState({})
let [password, setPassword] = useState({})
let [error, setError] = useState(null)

let render_form = ()=>{
    return (
        
            <div className="d-flex justify-content-center ">

            <div className="login">

            
        <form  onSubmit={submit} >
            <div className="headers">
            <h3 className="fw-bold">Log in</h3>
            </div>
            
            <span >Email  </span><br/>
            <input type="email"  className="mb-2 form-control" onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <span>password </span><br/>
            <input type="password" className="form-control " onChange = {(e)=>setPassword(e.target.value)}/><br/>
            <p className="text-danger">{error}</p>
            <input className="me-2 mb-2" type="checkbox"/><span className="fw-bold">Remember me</span><br/>
            <div className="d-flex justify-content-end">
            <button className="btn btn-primary" style={{width:"150px"}} type="submit">Login</button>
            </div>
            
         
        </form>
        </div>
        </div>
    )
}
let   submit = (e)=>{
    e.preventDefault(); 
    console.log('from auth.js');        
    let user = {
        email:email,
        password:password
    }
    axios.post("http://localhost:4000/login",user).then((response)=>{
        if(response.status ===200){
            
            console.log('3aaaaash');
            localStorage.setItem('sports_token',response.data)
            
            navigation('/home') 
            
            
        }
    })
    .catch((err)=>{ setError(err.response.data); console.log(error); })        

}

return(
    <div>
{render_form()}
    </div>
    
)

}

export default Login;