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
        <div className=" min-vh-100 p-5" >
        
            <div className="d-flex justify-content-center  row p-5 m-5 ">

            <div className="login">

            
        <form  onSubmit={submit}   style={{backgroundColor: "#d7d9db",borderRadius:'10px'}} >
            <div className="text-center p-3">
                <h3>Login</h3>
            </div>

            <div className="m-3">
            <span >Email  </span><br/>
            <input type="email"  className="  form-control" onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            </div>
            <div className="m-3">
            <span>password </span><br/>
            <input type="password" className="form-control  " onChange = {(e)=>setPassword(e.target.value)}/><br/>
            <p className="text-danger">{error}</p>

            <input className=" mb-2 m-3" type="checkbox" onChange={(e)=>{setRemember_me(e.target.checked);}} /><span className="fw-bold">Remember me</span><br/>
            </div>
            <div className="d-flex justify-content-end">
            <button className="btn btn-primary m-3" style={{width:"150px"}} type="submit">Login</button>
            </div>
            
         
        </form>
        </div>
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