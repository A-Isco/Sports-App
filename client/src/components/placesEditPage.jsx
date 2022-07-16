import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

let EditPlace = () => {
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
    let id = "62cda65df1489097e99c77d3";
    let token = window.localStorage.getItem("sports_token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    axios
      .get(`http://localhost:4000/api/places/football/${id}`, {
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
      formData.append("profile", Place.profile[key]);
    }

    let token = window.localStorage.getItem("sports_token");

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "token " + token,
    };
    let id = "62cda65df1489097e99c77d3";
    let baseUrl = `http://localhost:4000/api/places/football/${id}/update`;

    axios
      .patch(baseUrl, formData, { headers })

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

  return (
    <div className="row">
      <form
        className="col-4 mx-auto mt-5"
        action=""
        onSubmit={(e) => editPlace(e)}
      >
        <div className="form-row">
          <div className="form-group mb-2">
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
              className="form-control"
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
              className="form-control"
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
            className="form-control"
            id="customFile"
            name="profile"
            onChange={(e) => {
              handleChange(e);
            }}
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
          />
        </div>

        <div className="form-group mb-2">
          <label htmlFor="inputName">Address</label>
          <input
            name="address"
            value={Place.address}
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder=""
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <button className="btn btn-primary btn-block mb-2" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPlace;
