import { useEffect, useState } from "react";
import axios from "axios";
import logo from '../assets/images/logo.jpeg';
import {NavLink} from "react-router-dom";


let PlayerProfile = () => {
    let [Card, setCard] = useState("Player Card");
    let [Sports,setSports]=useState(["football","swimming"]);
    const [Player, setPlayer] = useState({
        sports: [],
        name: "",
        age: 0,
        address: "",
        img:"",
        regions:"",
        gender:"",
        rate:"",
        nationalID:""

    });
    const mystyle = {
         display:"flex"
    };
    const margin={
        marginLeft:"20px"

    };
    const img ={
        borderRadius: "50%",
        size:"50%"
    };
    const button= {
        backgroundColor: "blue", /* Green */
        // border: "none",
        color: "white",
        textAlign: "center",
        textDecoration: "none",
        // display: "inline-block",
        fontSize: "10px",
        height:"20px",
        marginLeft:"20px"

    };
    const avatar= {
        verticalAlign: "middle",
        width: "50px",
        height: "50px",
        borderRadius: "50%"
    }


    useEffect(() => {
        //let token = window.localStorage.getItem("token");
        //let id = window.localStorage.getItem("id");
        let id ="62c24c0c0d6372c368cb51ac";

        const headers = {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data"
            //Authorization: "token " + token,
        };
        axios
            .get(" http://localhost:4000/api/players/card/" + id , {
                headers,
            })
            .then((res) => {
                console.log(res.data);

                setPlayer(res.data);

            });
        axios
            .get(" http://localhost:4000/api/players/card/" + id , {
                headers,
            })
            .then((res) => {
                console.log(res.data);

                setPlayer(res.data);

            });

    }, []);
    return (
        <div className="w-50 mx-5">
            <h1 className="card-header ">{Card}</h1>
            <div className="card-body">
                <span style={mystyle}>
                    <img style={avatar} src ={`http://localhost:4000/${Player.img}`}/>
                    <div>
                <div className="text-primary" style={margin}> {Player.name}</div>
                <div className="text-primary" style={margin}> {Player.nationalID}</div>
                <div className="text-primary" style={margin}> {Player.age}</div>
                        <div className="text-primary" style={margin}> {Player.region}</div>
                        <div>{Player.region}</div>
                    </div>
                <NavLink className="btn-primary align-center" type="button" to={`/card/${Player._id}/update`} style={button}>
                          Edit Profile
                </NavLink>
                </span>
                <div>
                    {Player.sports.map((sport,index)=>(
                        <div className="btn btn-primary mx-2">{sport}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;
