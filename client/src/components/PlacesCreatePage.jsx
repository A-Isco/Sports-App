// import React from "@types/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
//import Select from "react-select";
import { useNavigate } from "react-router-dom";

let PlaceCreatePage = () => {
  let navigate = useNavigate();
  const [Place, setPlace] = useState({
    name: "",
    description: "",
    sport:"",
    price: "",
    // rate: "",
    region: "",
    address: "",
    profile: null,
  });
  const [images, SetImages] = useState([]);
  const [errors, SetErrors] = useState({});

  function createPlace(event) {
    event.preventDefault();

    let baseUrl = "http://localhost:4000/api/places/";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .post(baseUrl, { ...Place }, { headers })
      .then((response) => {
        SetErrors({});
        console.log(response);
        //navigate("/places");
        SetErrors({});
      })
      .catch((response) => {
        console.log(response);
        SetErrors(response.response.data);
      });

    console.log(Place);
  }

  // useEffect(() => {
  //   let token = window.localStorage.getItem("token");
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //axios.get("http://127.0.0.1:8000/api/v1/tags", { headers }).then((res) => {
  //console.log(res.data);
  //let received_tags = [];
  //received_tags = res.data.map((item) => {
  //       return {
  //         label: item.name,
  //         value: item.id,
  //       };
  //     });

  //     SetTags(received_tags);
  //   });
  // }, []);

  const handleChange = (event) => {
    if (event.target.name !== "images")
      setPlace({ ...Place, [event.target.name]: event.target.value });
    else {
      if (event.target.name === "profile") {
        let place = { ...Place };
        place.profile = event.target.files[0];
        setPlace(place);
      } else {
        let place = Place;
        place.images[0] = event.target.files[0];
        setPlace(place);
      }
    }
    console.log(Place);
  };

  // const handleChangeTags = (options) => {
  //   setPlace((prevState) => ({ ...prevState }));
  // };

  return (
    <div className="  row">
      <form className="col-4 mx-auto" onSubmit={(e) => createPlace(e)}>
        <div className="text-center p-3">
          <h3>Sports Club</h3>
        </div>
        <div className="form-group mb-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            name="name"
            // value={Place.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label>Description</label>
          <textarea
            type="textarea"
            row=""
            className="form-control"
            placeholder="Enter Descrition"
            name="description"
            // value={Place.description}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="form-group mb-2">
          <label>Sport</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Sport"
            name="sport"
            // value={Place.sport}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Price"
            name="price"
            // value={Place.sport}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label> Region</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter region"
            name="region"
            // value={Place.region}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label> Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="street,city"
            name="address"
            // value={Place.address}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="form-group mb-2">
          <label>upload photo</label>
          <input
            type="file"
            className="form-control"
            name="profile"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label>Images</label>
          <input
            type="file"
            className="form-control"
            name="images"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        {/* <div className="form-group mb-2">
          <label>skills</label>
          <Select
            options={tags}
            isMulti
            onChange={(e) => {
              handleChangeTags(e);
            }}
            value={Place.tags}
            name="tags"
          />
        </div> */}

        <button type="submit" className="btn btn-primary btn-block mb-2">
          Add
        </button>
      </form>
      <div className="mt-2 ">
        {Object.keys(errors).map((key) => {
          let value = errors[key];
          let message = value.join(",");
          return (
            <div className=" w-25 mx-auto alert alert-danger">
              {key} : {message}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaceCreatePage;
