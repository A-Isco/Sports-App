import { useEffect, useState } from "react";
import axios from "axios";
import logo from '../assets/images/logo.jpeg';
import {NavLink} from "react-router-dom"; // Tell webpack this JS file uses this image


let PlayerCard = () => {
    let [Card, setCard] = useState("Player Card");
    let [Sports,setSports]=useState(["football","swimming"]);
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
        border: "none",
        color: "white",
        textAlign: "center",
        textDecoration: "none",
        // display: "inline-block",
        fontSize: "16px",
        height:"15px",
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
            "Content-Type": "application/json",
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

    }, []);



    // Return Component
    return (

        <div>

            <h1>{Card}</h1>
            <div>

                <span style={mystyle}>
                    <img style={avatar} src={process.env.PUBLIC_URL+Player.img} />
                    <div>
                <div style={margin}>{Player.name}</div>
                <div style={margin}>{Player.address}</div>
                <div style={margin}>{Player.age}</div>
                    </div>
                <NavLink className="btn-primary align-center" type="button" to={`/card/${Player._id}/update`} style={button}>
                          Edit Profile
                </NavLink>
                </span>

            </div>

            <p>Sports</p>
            <table>
                <tr>
                    <th> </th>

                </tr>

                {Player.sports.map((sport,index)=>(
                <tr data-index={index}>
                    <td>{sport}</td>
                </tr>


            ))}
            </table>



        </div>
    );
};

export default PlayerCard;
