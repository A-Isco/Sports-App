import React, {useEffect, useState} from "react";
import Schema from 'form-schema-validation';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Select from 'react-select';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Navbar from "./core/newHomeBar";

let EditProfile = () => {
    const navigate=useNavigate();
    const [Player, setPlayer] = useState({
        sports: [],
        name: "",
        age: 0,
        address: "",
        img:"",
        region:"",
        gender:"",
        rate:"",

    });
    const [Region,setRegion] = useState({
        _id: "",
        name: Player.region
    });
    const [Sports,setSports] = useState({
        _id: "",
        name: Player.sports
    });

    useEffect(() => {
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`
        };
        axios
            .get(" http://localhost:4000/api/players/card/" , {
                headers,
            })
            .then((res) => {
                console.log(res.data.name);
                setPlayer(res.data);
            });
        axios
            .get(" http://localhost:4000/api/sports/"  , {
                headers,
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

        axios
            .get("http://localhost:4000/api/regions/"  , {
                headers,
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

    }, []);

    const [selected, setSelected] = useState([]);
    const [selectedreg, setSelectedreg] = useState([]);
    const [file, setFile] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [value,setValue]=useState("");
    const [errors, SetErrors] = useState("");
    const [imgerr,setImgerr]=useState("");




    const handleChange = (event) => {
        if(event.target.name=="nationalID"){
        }else {
            if (event.target.name == "img") {
                Player.img=event.target.files[0];
                setPlayer(Player);
            }else if(event.target.name=="region"){
                Player.region=event.label
                setPlayer(Player);
            }
            else{
                setPlayer({ ...Player, [event.target.name]: event.target.value });
            }
        }
    };

    function editPlayer(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',Player.name)
        formData.append('img',Player.img)
        formData.append('region',Player.region)
        formData.append('sports',Player.sports)
        formData.append('gender',Player.gender)
        formData.append('age',Player.age)
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

        };
        let baseUrl ="http://localhost:4000/api/players/card/update";

        axios.patch(baseUrl,formData,{headers})
            .then((response) => {
                console.log("res")

                console.log(response);
                SetErrors({});
                navigate("/card")

            })
            .catch((response) => {
               if(response.response.data==="Only .png, .jpg and .jpeg format allowed!"){
                   setImgerr(response.response.data)
                   SetErrors({});
               }
                //console.log(response.response.data.error.details[0].message)
                      else if(response.response.data.error.details[0].message!==undefined) {
                   SetErrors(response.response.data.error.details[0].message);
                   setImgerr("");
               }
            });
        console.log(Player);
    }
    return (
        <div >
            <Navbar/>
            <div>
            <div  className="card min-vh-100 p-5">
            <div className="row  p-5  m-5 ">
                <form className="col-4 mx-auto card  mt-3 p-3 "  action="http://localhost:4000/api/players/card"style={{backgroundColor: "#d7d9db"}} onSubmit={(e) => editPlayer(e)}  enctype="multipart/form-data">
                    <div className="text-center p-3">
                        <h3>Edit Profile</h3>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="inputName">Name</label>
                        <input name="name"
                               value={Player.name}
                               type="text"
                               className="form-control"
                               id="inputName"
                               placeholder=""
                               onChange={(e) => {
                                   handleChange(e);
                               }}
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="inputAge">Age</label>
                        <input name="age"
                               value={Player.age}
                               type="number"
                               className="form-control"
                               id="inputAge"
                               placeholder=""
                               onChange={(e) => {
                                   handleChange(e);
                               }}
                        />
                    </div>
                <div className="form-group mb-2">
                <label className="form-label" htmlFor="customFile">Update Image</label>
                <input
                    type="file"
                    className="form-control"
                    id="customFile"
                    name="img"
                    onChange={(e) => {
                        handleChange(e);
                        console.log(e.target.value)
                    }}
                />
                </div>
                <div className="form-group mb-2">
                    <label>Region</label>
                <Select
                    name={selectedreg}
                    value={selectedreg}
                    options={Region}
                    onChange={(e)=>{setSelectedreg(e);
                        Player.region=e.label
                        setPlayer(Player)
                        console.log(e.label)
                        console.log(Player)
                    }}
                />
                </div>

                    <div className="form-group mb-2">
                        <label>Sports</label>
                        <MultiSelect
                            options={Sports}
                            value={selected}
                            onChange={(e)=>{
                                setSelected(e);
                                let value=[]
                                e.map((item)=>{
                                    value.push(item.label);
                                })
                                Player.sports=value;

                            }}
                            labelledBy="Select"
                        />
                    </div>



                    <label>Gender</label>
                    <div className="form-check">
                        <input
                               className="form-check-input"
                               type="radio"
                               name="gender"
                               id="gender_male"
                               value="female"
                               onChange={(e) => {
                                   Player.gender="female"
                                   handleChange(e);
                               }}
                        />
                            <label className="form-check-label" htmlFor="Female">
                                Female
                            </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="gender_male"
                            value="male"
                            onChange={(e) => {
                                Player.gender="male"

                                handleChange(e);
                            }}
                        />
                            <label className="form-check-label" htmlFor="Male">
                                Male
                            </label>
                    </div>
                    <button className="btn btn-primary btn-block  form-control mt-3 mb-3" type="submit"  >Update</button>

                    {(errors.length > 0) ?
                        <div className="mt-2  form-control mx-auto alert alert-danger ">
                            {errors}

                        </div>:null
                    }
                    {(imgerr!=="") ?
                        <div className="mt-2  form-control mx-auto alert alert-danger ">
                            {imgerr}

                        </div>:null
                    }


                    </form>

        </div>
            </div>
            </div>
        </div>
    );
};

export default EditProfile;
