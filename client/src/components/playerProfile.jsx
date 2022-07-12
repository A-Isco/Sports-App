import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";


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
        <div className="container background py-4 text-center w-25 m-5 ">
            <div className="card card-width">
                <div className="card-body place">
                    <img src={`http://localhost:4000/${Player.img}`} alt={Player.name} width="300" height="250" className="m-5"/>
                    <h4 className="card-title p-3">{` ${Player.name}`}</h4>
                    <p>{` ${Player.nationalID}`}</p>
                    <p>{` ${Player.age}`}</p>
                    <p>{` ${Player.region}`}</p>
                    {Player.sports.map((sport,index)=>(
                        <p className="btn btn-primary mx-2">{sport}</p>
                    ))}
                    <div>
                        <Link className="btn btn-secondary " to={`/card/${Player._id}/update`}> show more</Link>
                    </div>
            </div>
        </div>
        </div>
    );
};

export default PlayerProfile;
