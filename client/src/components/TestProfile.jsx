import React, {useEffect, useState} from "react";
import Schema from 'form-schema-validation';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Select from 'react-select';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PlayerProfile from "./playerProfile";


const validationSchema = Yup.object({
    name: Yup.string().required(),
    age: Yup.number().required(),
});



const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
};
let TestProfile = () => {
    //let regions=[];
    const [Sports,setSports] = useState({
        _id: "",
        name: ""
    });


    const [Region,setRegion] = useState({
        _id: "",
        name: ""
    });
    const [Player, setPlayer] = useState({
        sports: [],
        name: "",
        age: 0,
        address: "",
        img:"",
        region:"",
        gender:"",
        rate:"",
        nationalID:""

    });
    const initialValues = {
        name: Player.name,
        age: Player.age,

    };

    useEffect(() => {
        //let token = window.localStorage.getItem("token");
        //let id = window.localStorage.getItem("id");
        let id ="62c24c0c0d6372c368cb51ac";

        const headers = {
            "Content-Type": "application/json",
            //Authorization: "token " + token,
        };

        axios
            .get(" http://localhost:4000/api/players/card/" +id , {
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



    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        if(event.target.name=="nationalID"){
            console.log("nationalID")
            const regex = /^[0-9]\d*$/;
            const id =event.target.value;
            if(event.target.value.match(regex)){
                console.log("match")
                const i=0;
                const sum=0;
                if (id.length != 13) return setValue(id.length);
                else return setValue("");
                // STEP 1 - get only first 12 digits
                for (i = 0, sum = 0; i < 12; i++) {
                    // STEP 2 - multiply each digit with each index (reverse)
                    // STEP 3 - sum multiply value together
                    sum += parseInt(id.charAt(i)) * (13 - i);
                }
                // STEP 4 - mod sum with 11
                let mod = sum % 11;
                // STEP 5 - subtract 11 with mod, then mod 10 to get unit
                let check = (11 - mod) % 10;
                // STEP 6 - if check is match the digit 13th is correct
                if (check == parseInt(id.charAt(12))) {
                    return setValue("");
                }
            }
        }else {
            if (event.target.name == "img") {
                Player.img=event.target.files[0];
                setPlayer(Player);
                //setFile({file: event.target.files[0]});

                //setPlayer({...Player, [event.target.name]: event.target.files[0]});


            }else{
                setPlayer({ ...Player, [event.target.name]: event.target.value });


            }
        }

        console.log(Player);
    };

    function editPlayer(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',Player.name)
        formData.append('img',Player.img)
        formData.append('region',Player.region)
        formData.append('nationalID',Player.nationalID)
        formData.append('sports',Player.sports)
        formData.append('gender',Player.gender)
        formData.append('age',Player.age)










        console.log("data")
        console.log(event)
        console.log("dd");
        console.log(Player);
        // if(!renderError){
        //     console.log("no err");
        //
        // }


        //setPlayer(Player)
        // event.preventDefault();
        // let token = window.localStorage.getItem("token");
        // let id = window.localStorage.getItem("id");
        const headers = {
            "Content-Type": "multipart/form-data",
            // Authorization: "token " + token,
        };
        let id ="62c24c0c0d6372c368cb51ac";
        let baseUrl ="http://localhost:4000/api/players/card/62c24c0c0d6372c368cb51ac/update";

        axios.patch(baseUrl,formData,{headers})
            // .patch(baseUrl, {...Player, sports:selected.map(o=>(o.label) ), region:selectedreg , img:file},{headers}
            //)
            .then((response) => {
                console.log("res")

                console.log(response);
                // navigate("/developer/profile")
            })
            .catch((response) => {

                console.log(response);

            });

        console.log(Player);

    }

    const renderError = (message) => <p className="help is-danger " >{message}</p>;



    return (
        <div>
            {/*<Formik*/}
            {/*    initialValues={initialValues}*/}
            {/*    validate={values => {*/}
            {/*        const errors = {};*/}
            {/*        if (!values.name | !values.age) {*/}
            {/*            errors.name = 'Required';*/}
            {/*            errors.age='Required';*/}
            {/*        }*/}
            {/*        return errors;*/}
            {/*    }}*/}
            {/*    onSubmit={(values, { setSubmitting }) => {*/}
            {/*        setTimeout(() => {*/}
            {/*            alert(JSON.stringify(values, null, 2));*/}
            {/*            setSubmitting(false);*/}
            {/*        }, 400);*/}
            {/*    }}*/}

            {/*>*/}
            {/*{({ isSubmitting }) => (*/}
            {/*    <form>*/}

            <Formik
                initialValues={initialValues}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    } else if (!values.name) {
                        errors.email = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {

                    console.log("values")
                    console.log(values)

                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
            <form className="mx-5" onSubmit={handleSubmit} enctype="multipart/form-data">
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputName">Name</label>
                        <input name="name"
                               value={values.name}
                               type="text"
                               className="form-control"
                               id="inputName"
                               placeholder=""
                               onChange={(e) => {
                                   handleChange(e);
                               }}
                        />
                        {/*{errors.name}*/}
                        {/*<ErrorMessage name="name" render={renderError} />*/}
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputAge">Age</label>
                        <input name="age"
                               value={values.age}
                               type="number"
                               className="form-control"
                               id="inputAge"
                               placeholder=""
                               onChange={(e) => {
                                   handleChange(e);
                               }}
                        />
                        {/*{errors.age}*/}
                        {/*<ErrorMessage name="age" render={renderError} />*/}


                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputID">nationalID</label>
                        <input
                            name="nationalID"
                            value={Player.nationalID}
                            type="text"
                            className="form-control"
                            id="inputID"
                            placeholder=""
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                        <div>{value}</div>
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
                            //setFile(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group col-md-4">
                    <label>Region</label>
                    <Select
                        name={selectedreg}
                        value={selectedreg}
                        onChange={(e)=>{setSelectedreg(e.label);
                            console.log(e.label)

                        }}
                        options={Region}

                    />
                </div>


                {/*<div className="form-group col-md-4">*/}
                {/*    <label>Regions</label>*/}
                {/*    <MultiSelect*/}
                {/*        options={Region}*/}
                {/*        value={selectedreg}*/}
                {/*        onChange={(e)=>{*/}
                {/*            setSelectedreg(e);*/}
                {/*        }}*/}
                {/*        labelledBy="Select"*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="form-group col-md-4">
                    <label>Sports</label>
                    <MultiSelect
                        options={Sports}
                        value={selected}
                        onChange={(e)=>{
                            setSelected(e);
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
                    {/*<ErrorMessage name="gender" render={renderError} />*/}

                </div>
                <button className="btn btn-primary btn-block mb-2" type="submit" disabled={isSubmitting}  >Update</button>
            </form>
                )}
            </Formik>
            {/*        // )}*/}
            {/*// </Formik>*/}
        </div>
    );


};

export default TestProfile;
