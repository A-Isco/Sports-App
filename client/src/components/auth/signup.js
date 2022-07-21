import React, {useContext, useEffect, useState} from "react";
import axios from 'axios'
import $ from 'jquery';
import {appContext} from '../../App'
import {useNavigate} from 'react-router-dom';
import Select from "react-select";
import {MultiSelect} from "react-multi-select-component";

let Signup = ()=>{
    let appContextValue = useContext(appContext)

    useEffect(()=>{


        axios
            .get("http://localhost:4000/api/regions/"  , {

            })
            .then((res) => {
                let regions=[]
                regions=res.data.map((item)=>{
                    return{
                        label: item.name,
                        value: item._id,

                    };
                });
                setRegion(regions)
            });

        axios
            .get(" http://localhost:4000/api/sports/"  , {

            })
            .then((res) => {
                let sports=[]
                sports=res.data.map((item)=>{
                    return{
                        label: item.name,
                        value: item._id,

                    };
                });
                setSports(sports)
            });

    },[]);


    let navigation = useNavigate()
    let [username, setUsername] = useState({})
    let [email, setEmail] = useState({})
    let [password, setPassword] = useState({})
    let [confirm_password, setConfirm_password] = useState({})
    let [gender, setGender] = useState(null)
    let [birth_date, setBirth_date] = useState({})
    let [regions, setRegions] = useState({})
    let [Sports, setSports] = useState({})
    let [error, setError] = useState(null)

    let [selectedreg, setSelectedreg] = useState([]);
    let [Region,setRegion] = useState({});
    let [selected, setSelected] = useState([]);
    let [img,setimg]=useState();
    let [sports,setsports]=useState();




let render_form = ()=>{
    return(

<div className="card min-vh-100 p-5">




<div className="row p-5 m-5" >

    <div className="">
        <form className="signup col-5 mx-auto   mt-3 p-3 " style={{backgroundColor: "#d7d9db",borderRadius:'10px'}} onSubmit={(e) => create_account(e)}   enctype="multipart/form-data">
            <div>
                <h2 className="fw-bold mt-5">Create Account</h2>
                <p className="text-secondary">By creating account you will be able to book any playground you want,
                    connect with other players and make a team</p>
            </div>
            <span>Name</span><br/>
            <input type="text"  className="mb-2 form-control mt-1"  onChange={(e)=>setUsername(e.target.value)}/>
            <br/>
            <span>Email</span><br/>
            <input type="email"  className="mb-2 form-control mt-1"  onChange={(e)=>setEmail(e.target.value)}/>
            <br/>
            <span>Password</span><br/>
            <input type="password"  className="mb-2 form-control mt-1"  onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <span>Confirm Password</span><br/>
            <input type="password"  className="mb-2 form-control mt-1"  onChange={(e)=>setConfirm_password(e.target.value)}/>
            <br/>
            <div className="row">
                <div className="col-7 ">
                    <span>Gender</span><br/>
                    <input onChange={change_gender} className="me-2 mb-2 mt-3 " id="male" type="checkbox"/><span className="me-5">Male</span>
                    <input onChange={change_gender} className="me-2 mb-2 ms-5" id="female" type="checkbox"/><span>Female</span>
                </div>
                <div className="col-5">
                <span>Birth Date</span><br/>
                <input onChange={(e)=>setBirth_date(e.target.value)} type="date" className="mt-3 form-control"/>
                </div>
            </div>
            <div className="form-group col-md-4">
                <label>Region</label>
                <Select
                    name={selectedreg}
                    value={selectedreg}
                    options={Region}
                    onChange={(e)=>{setSelectedreg(e);
                        setRegions(e.label);
                    }}
                />
            </div>
            <br/>
            <div className="form-group col-md-4">
                <label>Sports</label>
                <MultiSelect
                    options={Sports}
                    value={selected}
                    onChange={(e)=>{
                        setSelected(e);
                        console.log(selected)

                        let value=[]
                        e.map((item)=>{
                            console.log(String(item.label));
                            value.push(String(item.label));
                        })
                        setsports(value)
                    }}
                />
            </div>
            <div className="form-group col-md-6">
                <label className="form-label" htmlFor="customFile">Insert Image</label>
                <input
                    type="file"
                    className="form-control"
                    id="customFile"
                    name="img"
                    onChange={(e) => {
                        setimg(e.target.files[0])
                    }}
                />
            </div>
            <p className="text-danger">{error}</p>
            <br/>

            <div className=" d-flex justify-content-end">
                <button type="submit"  className="btn btn-primary rounded-3 fw-bold mt-auto mb-4 mx-3">Create Account</button>
            </div>
        </form>
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
    console.log("before")
    e.preventDefault();
    console.log("after")
    const formData = new FormData();


    formData.append('name',username)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('gender',gender)
    formData.append('birth_date',birth_date)
    formData.append('region',regions)
    formData.append('sports',sports)
    formData.append('img',img)
    const headers = {
        "Content-Type": "application/json",
       // authorization:`token ${token}`

    };

    if(password===confirm_password){

        axios.post("http://localhost:4000/signup",formData).then((response)=>{
            if(response.status ===200){

                console.log('3aaaaash');
                localStorage.setItem('sports_token',response.data.token)
                localStorage.setItem('refresh_sports_token',response.data.refresh_token)
                appContextValue.setIsLoggedIn(true)
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
