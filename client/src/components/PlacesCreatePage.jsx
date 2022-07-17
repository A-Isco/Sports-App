// import React from "@types/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

let PlaceCreatePage = () => {
  const [Place, setPlace] = useState({
    name: "",
    description: "",
    sport: "",
    price: "",
    region: "",
    address: "",
    profile: [],
  });
  const [Region, setRegion] = useState({
    _id: "",
    name: Place.region,
  });
  const [Sports, setSports] = useState({
    _id: "",
    name: Place.sport,
  });
  const [errors, SetErrors] = useState({});
  useEffect(() => {
    let token = window.localStorage.getItem("sports_token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };
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

  const [selected, setSelected] = useState([]);
  const [selectedreg, setSelectedreg] = useState([]);

  const handleChange = (event) => {

      if (event.target.name == "profile") {
        {
          Place.profile = event.target.files;
          setPlace(Place);
        }
      } else if (event.target.name == "region") {
        Place.region = event.target.value;
        setPlace(Place);
      } else if (event.target.name == "sport") {
        Place.sport = event.target.value;
        setPlace(Place);
      } else {
        setPlace({ ...Place, [event.target.name]: event.target.value });
      }

    console.log(Place);
  };

  function createPlace(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", Place.name);
    formData.append("region", Place.region);
    formData.append("address", Place.address);
    formData.append("sport", Place.sport);
    formData.append("description", Place.description);
    formData.append("price", Place.price);
    for (const key of Object.keys(Place.profile)) {
      formData.append("profile", Place.profile[key]);
    }

    let token = window.localStorage.getItem("sports_token");
    let baseUrl = "http://localhost:4000/api/places/football/create";

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `token ${token}`,
    };
    axios
      .post(baseUrl, formData, { headers })
      .then((response) => {
        SetErrors({});
        console.log(response);
        SetErrors({});
      })
      .catch((response) => {
        console.log(response);
        SetErrors(response.response.data);
      });

    console.log(Place);
  }

  return (
    <div className="row">
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
            onChange={(e) => {
              handleChange(e);
            }}
            required
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
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Price"
            name="price"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>

        <div className="form-group mb-2">
          <label>Region</label>
          <Select
            name={selectedreg}
            value={selectedreg}
            options={Region}
            onChange={(e) => {
              setSelectedreg(e);
              Place.region = e.label;
              setPlace(Place);
            }}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label>Sport</label>
          <Select
            name={selected}
            value={selected}
            options={Sports}
            onChange={(e) => {
              setSelected(e);
              console.log(e);
              Place.sport = e.label;
              setPlace(Place);
            }}
            required
          />
        </div>
        <div className="form-group mb-2">
          <label> Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="street,city"
            name="address"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="form-group mb-2">
          <label>Profile</label>
          <input
            multiple
            type="file"
            className="form-control"
            name="profile"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

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
