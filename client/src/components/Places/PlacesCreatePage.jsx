// import React from "@types/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

let DeveloperCreatePage = () => {
  let navigate = useNavigate();
  const [Place, setPlace] = useState({
    name: "",
    Description: "",
    password: "",
    password_confirm: "",
    cv: null,
    gender: "",
    date_of_birth: "",
    tags: [],
    user_type: "developer",
    profile_picture: null,
  });
  const [tags, SetTags] = useState([]);
  const [errors, SetErrors] = useState({});

  function createDeveloper(event) {
    event.preventDefault();

    let baseUrl = "http://127.0.0.1:8000/api/v1/account/signup";
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    axios
      .post(
        baseUrl,
        { ...Developer, tags: Developer.tags.map((o) => Number(o.value))[0] },
        { headers }
      )
      .then((response) => {
        SetErrors({});
        console.log(response);
        navigate("/login");
        SetErrors({});
      })
      .catch((response) => {
        console.log(response);
        SetErrors(response.response.data);
      });

    console.log(Developer);
  }

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    axios.get("http://127.0.0.1:8000/api/v1/tags", { headers }).then((res) => {
      console.log(res.data);
      let received_tags = [];
      received_tags = res.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });

      SetTags(received_tags);
    });
  }, []);

  const handleChange = (event) => {
    if (event.target.name !== "cv" && event.target.name !== "profile_picture")
      setDeveloper({ ...Developer, [event.target.name]: event.target.value });
    else {
      if (event.target.name === "cv") {
        let dev = { ...Developer };
        dev.cv = event.target.files[0];
        setDeveloper(dev);
      } else {
        let dev = Developer;
        dev.profile_picture = event.target.files[0];
        setDeveloper(dev);
      }
    }
    console.log(Developer);
  };

  const handleChangeTags = (options) => {
    setDeveloper((prevState) => ({ ...prevState, tags: options }));
  };

  return (
    <div className="  row">
      <form className="col-4 mx-auto" onSubmit={(e) => createDeveloper(e)}>
        <div className="text-center p-3">
          <h3>SIGN UP</h3>
        </div>
        <div className="form-group mb-2">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter user name"
            name="username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={Developer.email}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="form-group mb-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={Developer.password}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label> repeat Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password_confirm"
            value={Developer.password_confirm}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="form-group">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault1"
            value="M"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault2"
            value="F"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            female
          </label>
        </div>

        <div className="form-group mb-2">
          <label>birth date</label>
          <input
            type="date"
            className="form-control"
            name="date_of_birth"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label>upload resume</label>
          <input
            type="file"
            className="form-control"
            name="cv"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="form-group mb-2">
          <label>upload Image</label>
          <input
            type="file"
            className="form-control"
            name="profile_picture"
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="form-group mb-2">
          <label>skills</label>
          <Select
            options={tags}
            isMulti
            onChange={(e) => {
              handleChangeTags(e);
            }}
            value={Developer.tags}
            name="tags"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-2">
          SIGN UP
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

export default DeveloperCreatePage;
