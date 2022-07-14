import { useState } from "react";
import axios from 'axios'
import $ from 'jquery';
import {useNavigate} from 'react-router-dom';
let Signup = ()=>{
    let navigation = useNavigate()
    let [username, setUsername] = useState({})
    let [email, setEmail] = useState({})
    let [password, setPassword] = useState({})
    let [confirm_password, setConfirm_password] = useState({})
    let [gender, setGender] = useState(null)
    let [birth_date, setBirth_date] = useState({})
    let [region, setRegion] = useState({})
    let [sport, setSport] = useState({})
    let [error, setError] = useState(null)


let render_form = ()=>{
    return(

<div>


<div>
   <h2 className="fw-bold mt-5">Create Account</h2> 
   <p className="text-secondary">By creating account you will be able to book any playground you want,
   connect with other players and make a team</p>
</div>
<div className="row">
    <div className="col-8">
        <form className="signup">
            <span>Name</span><br/>
            <input type="text"  className="mb-2 form-control mt-1" style={{width:"46vw"}} onChange={(e)=>setUsername(e.target.value)}/>
            <br/>
            <span>Email</span><br/>
            <input type="email"  className="mb-2 form-control mt-1" style={{width:"46vw"}} onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <span>Password</span><br/>
            <input type="password"  className="mb-2 form-control mt-1" style={{width:"46vw"}} onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <span>Confirm Password</span><br/>
            <input type="password"  className="mb-2 form-control mt-1" style={{width:"46vw"}} onChange={(e)=>setConfirm_password(e.target.value)}/>
            <br/>
            <div className="row">
                <div className="col-7 ">
                    <span>Gender</span><br/>
                    <input onChange={change_gender} className="me-2 mb-2 mt-3 " id="male" type="checkbox"/><span className="me-5">Male</span>
                    <input onChange={change_gender} className="me-2 mb-2 ms-5" id="female" type="checkbox"/><span>Female</span>
                </div>
                <div className="col-5">
                <span>Birth Date</span><br/>
                <input onChange={(e)=>setBirth_date(e.target.value)} type="date" style={{width:"10vw"}} className="mt-3 form-control"/>
                </div>
            </div>
            <span>Region</span><br/>
            <input type="text"  className="mb-2 form-control mt-1" style={{width:"46vw"}} onChange={(e)=>setRegion(e.target.value)}/>
            <br/>
            <span>Sport</span><br/>
            <input type="text"  className="mb-2 form-control mt-1" style={{width:"46vw"}} onChange={(e)=>setSport(e.target.value)}/>
            <p className="text-danger">{error}</p>
            <br/>
        </form>
    </div>
    <div className="col-4 d-flex align-items-center flex-column">
        <span>Player Image</span><br></br>
        <img className="pp" src="./pp.jpeg"/>
        <button className=" browse btn btn-secondary mt-3 rounded-pill text-dark" >Browse</button>
        <button type="submit" onClick={create_account} className="btn btn-primary rounded-3 fw-bold mt-auto mb-4">Create Account</button>
    </div>

</div>
</div>
    )
}

let change_gender = (e)=>{
    console.log(e.target.id);
    if(e.target.id==='male' && $('#male').is(":checked")){
        $('#female').prop('checked', false);
        setGender('M');
    }

    else if (e.target.id==='female' && $('#female').is(":checked")){
        $('#male').prop('checked', false);
        setGender('F');
    }

    else {
        setGender(null);
    }
  
}

let create_account = (e)=>{
    e.preventDefault();
    
    let user = {
        name:username,
        email:email,
        password:password,
        gender:gender,
        birth_date:birth_date,
        region:region,
        sport:sport
    }
    // user_schema.validate(user)
    console.log(user);
    if(password===confirm_password){

        axios.post("http://localhost:4000/signup",user).then((response)=>{
            if(response.status ===200){
                
                console.log('3aaaaash');
                localStorage.setItem('sports_token',response.data.token)
                localStorage.setItem('refresh_sports_token',response.data.refresh_token)
                navigation('/home')
            }
        })
        .then((data)=>{console.log(data);})
        .catch((err)=>{ setError(err.response.data); console.log(error); })  
    }else{
        setError('you should enter the same password twice')
    }
 
}
return(
    <div>
        {render_form()}
    </div>
)

}

export default Signup;