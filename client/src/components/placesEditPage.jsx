import React, { useEffect, useState } from "react";
import Schema from "form-schema-validation";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Select from "react-select";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

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
let EditPlace= () => {
  let navigate = useNavigate();

  //let regions=[];

  const [Place, setPlace] = useState({
    name: "",
    description: "",
    sports: "",
    price: "",
    // rate: "",
    region: "",
    address: "",
    profile: null,
  });
  const [Region, setRegion] = useState({
    _id: "",
    name: Place.region,
  });
  const [Sports, setSports] = useState({
    _id: "",
    name: Place.sports,
  });

  useEffect(() => {
    //let token = window.localStorage.getItem("token");
    //let id = window.localStorage.getItem("id");
    let id = "62c24c0c0d6372c368cb51ac";

    const headers = {
      "Content-Type": "application/json",
      //Authorization: "token " + token,
    };

    axios
      .get(`http://localhost:4000/api/places/football/${id}` , {
        headers,
      })
      .then((res) => {
        console.log(res.data.name);
        setPlace(res.data);
        setRegion(res.data.region);
        setSports(res.data.sports);
      });
    axios
      .get(" http://localhost:4000/api/sports/", {
        headers,
      })
      .then((res) => {
        let sports = [];
        sports = res.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setSports(sports);
      });

    axios
      .get("http://localhost:4000/api/regions/", {
        headers,
      })
      .then((res) => {
        let regions = [];
        regions = res.data.map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setRegion(regions);
      });
  }, []);

  // const handleChangeTags = (options) => {
  //     setPlayer((prevState) => ({ ...prevState, Region: options }));
  // };
  const [selected, setSelected] = useState([]);
  const [selectedreg, setSelectedreg] = useState([]);
  const [file, setFile] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [value, setValue] = useState("");
  const [errors, SetErrors] = useState("");

  const handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.label);
    // if (event.target.name == "sports") {
    // }
    // if (event.target.name == "nationalID") {
    //   console.log("nationalID");
    //   const regex = /^[0-9]\d*$/;
    //   const id = event.target.value;
    //   if (event.target.value.match(regex)) {
    //     console.log("match");
    //     const i = 0;
    //     const sum = 0;
    //     if (id.length != 13) return setValue(id.length);
    //     else return setValue("");
    //   }
    // }
    
      if (event.target.name == "img") {
        Place.profile= event.target.files[0];
        setPlace(Place);
        //setFile({file: event.target.files[0]});

        //setPlayer({...Player, [event.target.name]: event.target.files[0]});
      } else if (event.target.name == "region") {
        Place.region = event.label;
        setPlace(Place);
      } else {
        setPlace({ ...Place, [event.target.name]: event.target.value });
      }
    

    console.log(Place);
  };

  function editPlace(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", Place.name);
    formData.append("profile", Place.profile);
    formData.append("region", Place.region);
    formData.append("address", Place.address);
    formData.append("sports", Place.sports);
    formData.append("description", Place.description);
    formData.append("price", Place.price);
    console.log("data");
    console.log(event);
    console.log("dd");
    console.log(Place);
    //setPlayer(Player)
    // event.preventDefault();
    // let token = window.localStorage.getItem("token");
    // let id = window.localStorage.getItem("id");
    const headers = {
      "Content-Type": "multipart/form-data",
      // Authorization: "token " + token,
    };
    let id = "62cda65df1489097e99c77d3";
    let baseUrl =
      `http://localhost:4000/api/places/football/${id}/update`;

    axios
      .patch(baseUrl, formData, { headers })
      // .patch(baseUrl, {...Player, sports:selected.map(o=>(o.label) ), region:selectedreg , img:file},{headers}
      //)
      .then((response) => {
        console.log("res");

        console.log(response);
        SetErrors({});
      })
      .catch((response) => {
        SetErrors(response.response.data.error.details[0].message);
      });

    console.log(Place);
  }

  const renderError = (message) => <p className="help is-danger ">{message}</p>;

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

      <form
        className="mx-5"
        action=""
        onSubmit={(e) => editPlace(e)}
        enctype="multipart/form-data"
      >
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputName">Name</label>
            <input
              name="name"
              value={Place.name}
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
            <label htmlFor="inputDescription">Description</label>
            <input
              name="description"
              value={Place.description}
              type="number"
              className="form-control"
              id="inputDescription"
              placeholder=""
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {/*{errors.age}*/}
            {/*<ErrorMessage name="age" render={renderError} />*/}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPrivce">Price</label>
            <input
              name="pricr"
              value={Place.price}
              type="text"
              className="form-control"
              id="inputPrice"
              placeholder=""
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div>{value}</div>
          </div>
        </div>
        <div className="form-group col-md-6">
          <label className="form-label" htmlFor="customFile">
            Update Image
          </label>
          <input
            type="file"
            className="form-control"
            id="customFile"
            name="profile"
            onChange={(e) => {
              handleChange(e);
              console.log(e.target.value);
              //setFile(e.target.value);
            }}
          />
        </div>
        <div className="form-group col-md-4">
          <label>Region</label>
          <Select
            name={selectedreg}
            value={selectedreg}
            options={Region}
            onChange={(e) => {
              setSelectedreg(e.label);
              Place.region = e.label;
              setPlace(Place);
              console.log(e.label);
              console.log(Place);
            }}
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
            onChange={(e) => {
              setSelected(e);
              let value = [];
              e.map((item) => {
                value.push(item.label);
              });
              // setPlayer(...PlayerPlayer.sports,value);
              console.log(value);
              // setPlayer((prevState) => ({ ...prevState, sports: e }));
              //setPlayer({[Player.sports]:value})
              Place.sports = value;
              //     item
              //
              // })

              //setPlayer((prevState) => ({ ...prevState, sports: e.label }));
              console.log(Place);
            }}
            labelledBy="Select"
          />
        </div>

        <label>Address</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="address"
            id="address"
            value=""
            onChange={(e) => {
              Place.address = "";
              handleChange(e);
            }}
          />
          <label className="form-check-label" htmlFor="">
            
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
              // Player.gender = "male";

              handleChange(e);
            }}
          />
          <label className="form-check-label" htmlFor="Male">
            Male
          </label>
          {/*<ErrorMessage name="gender" render={renderError} />*/}
        </div>
        <button className="btn btn-primary btn-block mb-2" type="submit">
          Update
        </button>
      </form>
      <div className="mt-2 w-25 mx-auto alert alert-danger ">
        {/*{errors.map((key) => {*/}

        {/*    // let message = value.join(",");*/}
        {/*    return (*/}
        {/*        <div className=" w-25 mx-auto alert alert-danger">*/}
        {/*            { key.messege}*/}
        {/*        </div>*/}
        {/*    );*/}
        {/*})}*/}
        {errors}
      </div>
      {/*        // )}*/}
      {/*// </Formik>*/}
    </div>
  );
};

export default EditPlace;
