import React, {useEffect, useState} from "react";
import Schema from 'form-schema-validation';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Select from 'react-select';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Navbar from "./core/newHomeBar";



const validationSchema = Yup.object({

    name: Yup.string().required(),
    age: Yup.number().required(),
});

const initialValues = {
    name: "",
    age: 0,

};

const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
};
let EditProfile = () => {
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
        //let token = window.localStorage.getItem("token");
        //let id = window.localStorage.getItem("id");
       // let id ="62c24c0c0d6372c368cb51ac";

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

    // const handleChangeTags = (options) => {
    //     setPlayer((prevState) => ({ ...prevState, Region: options }));
    // };
    const [selected, setSelected] = useState([]);
    const [selectedreg, setSelectedreg] = useState([]);
    const [file, setFile] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [value,setValue]=useState("");
    const [errors, SetErrors] = useState("");




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
                SetErrors(response.response.data.error.details[0].message);
            });
        console.log(Player);
    }
    return (
        <div>
            <Navbar/>
            <div  className="d-flex justify-content-center ">
            <div className="w-75" >



                <form className="mx-5"  action="http://localhost:4000/api/players/card" onSubmit={(e) => editPlayer(e)}  enctype="multipart/form-data">
                <div className="form-row">
                    <div className="form-group col-md-6">
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
                    <div className="form-group col-md-6">
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
                </div>
                <div className="form-group col-md-6">
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
                <div className="form-group col-md-4">
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

                    <div className="form-group col-md-4">
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
                    <button className="btn btn-primary btn-block mb-2" type="submit"  >Update</button>
                    </form>
            <div className="mt-2 w-25 mx-auto alert alert-danger ">
                {errors}

            </div>
        </div>
            </div>
        </div>

    );


};

export default EditProfile;
