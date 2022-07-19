import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import {useNavigate, useParams} from "react-router-dom";

let EditPlace = () => {
  const navigate=useNavigate();
  let { placeId } = useParams();
  let { Sport } = useParams();
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

  useEffect(() => {

    let token = window.localStorage.getItem("sports_token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    axios
      .get(`http://localhost:4000/api/places/${Sport}/${placeId}`, {
        headers,
      })
      .then((res) => {
        console.log(res.data.name);
        setPlace(res.data);
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

  const [selected, setSelected] = useState([]);
  const [selectedreg, setSelectedreg] = useState([]);
  const [errors, SetErrors] = useState("");

  const handleChange = (event) => {
    console.log(event.target.name);
    console.log(event.label);

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
  };

  function editPlace(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", Place.name);
    formData.append("region", Place.region);
    formData.append("address", Place.address);
    formData.append("sport", Place.sport);
    formData.append("description", Place.description);
    formData.append("price", Place.price);
    for (const key of Object.keys(Place.profile)) {
      if(Place.profile.length==1 || Place.profile.length==0){
        formData.append("profile",Place.profile)
      }else {
        formData.append("profile", Place.profile[key]);
      }
    }

    let token = window.localStorage.getItem("sports_token");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "token " + token,
    };
    let id = "62cda65df1489097e99c77d3";
    let baseUrl = `http://localhost:4000/api/places/${Sport}/${placeId}/update`;

    axios
      .patch(baseUrl, formData, { headers })

      .then((response) => {
        console.log("res");
        navigate(`/${Sport}/places/${placeId}`)

        console.log(response);
        SetErrors({});
      })
      .catch((response) => {
        SetErrors(response.response.data.error.details[0].message);
      });

    console.log(Place);
  }

  return (
      <div className="card min-vh-100 p-5" >
    <div className="row p-5 m-5">
      <form
          className="col-4 mx-auto card  mt-3 p-3  " style={{backgroundColor: "#d7d9db",borderRadius:'10px'}}
        action=""
        onSubmit={(e) => editPlace(e)}
      >
        <div className="text-center p-3">
          <h3>Edit place</h3>
        </div>
        <div className="form-row mt-3">
          <div className="form-group  mb-2">
            <label htmlFor="inputName">Name</label>
            <input
              name="name"
              value={Place.name}
              type="text"
              className="form-control  rounded-pill"
              id="inputName"
              placeholder=""
              onChange={(e) => {
                handleChange(e);
                console.log(e);
                console.log(Place.name);
              }}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="inputDescription">Description</label>
            <input
              name="description"
              value={Place.description}
              type="textarea"
              row="4"
              className="form-control  rounded-pill"
              id="inputDescription"
              placeholder=""
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="inputPrivce">Price</label>
            <input
              name="price"
              value={Place.price}
              type="number"
              className="form-control  rounded-pill"
              id="inputPrice"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
        <div className="form-group mb-2">
          <label className="form-label" htmlFor="customFile">
            Update Image
          </label>
          <input
            multiple
            type="file"
            className="form-control  rounded-pill"
            id="customFile"
            name="profile"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2  rounded-pill">
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
            className=" form-control rounded-pill"
          />
        </div>
        <div className="form-group mb-2  rounded-pill">
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
            className=" form-control rounded-pill"
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="inputName">Address</label>
          <input
            name="address"
            value={Place.address}
            type="text"
            className="form-control  rounded-pill"
            id="inputAddress"
            placeholder=""
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <button className=" form-control btn btn-primary btn-block mb-3 mt-3  rounded-pill" type="submit">
          Update
        </button>
      </form>
    </div>
        </div>
  );
};

export default EditPlace;
