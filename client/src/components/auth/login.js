import { useContext, useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import {appContext} from '../../App'
let Login = ()=>{
let appContextValue = useContext(appContext)
let navigation = useNavigate()
let [email, setEmail] = useState('')
let [password, setPassword] = useState('')
let [remember_me, setRemember_me] = useState(false)
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
            <input className="me-2 mb-2" type="checkbox" onChange={(e)=>{setRemember_me(e.target.checked);}} /><span className="fw-bold">Remember me</span><br/>
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
        password:password,
        remember_me:remember_me
    }

    axios.post("http://localhost:4000/login",user).then((response)=>{
        if(response.status ===200){
            
            console.log('3aaaaash');
            console.log(response.data.refresh_token);
            localStorage.setItem('sports_token',response.data.token)
            localStorage.setItem('refresh_sports_token',response.data.refresh_token)
            if (remember_me) {
                console.log('remember me check is ok');
                localStorage.setItem("REMEMBER_ME", "1")
            }else{
                console.log('remember me check is not ok');
                localStorage.removeItem("REMEMBER_ME")
            }
            appContextValue.setIsLoggedIn(true)
            
            navigation('/home') 
            
            
        }
    })
    .catch((err)=>{ setError(err.response.data); console.log(error); })        

}

return(
    <div className="container">
        {render_form()}
    </div>
    
)

}

export default Login;