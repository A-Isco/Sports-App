import React from 'react'
import styled from "styled-components"
import {Link, NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
    const [Player, setPlayer] = useState({});
    const [log, setLog] = useState("logout");


        useEffect(() => {
        if((localStorage.getItem('sports_token') !== null)) {
            setLog("login")
            let token = String(localStorage.getItem('sports_token'))
            const headers = {
                "Content-Type": "application/json",
                authorization: `token ${token}`

            };
            axios
                .get(" http://localhost:4000/api/players/card/", {
                    headers,
                })
                .then((res) => {
                    console.log("jjjjjjj")
                    console.log(res);

                    setPlayer(res.data);

                })
                .catch((res) => {
                    console.log(res);

                    //setPlayer(res.data);

                });


        }
        else
            setLog("logout")
        }, []);

  return (
    <Container>
        <nav>
        <ul className="list">
            { (log==="logout")? <div className="d-flex flex-row align-items-center"><Link to={"/login"} className="nav-link"><li className="items">LOGIN</li></Link>
                <Link to={"/signup"} className="nav-link"><li className="items">REGISTER</li></Link>
                <Link to={"/card"} className="nav-link">
                <img src="/images/bnyadam.png" alt="human" width={"70px"} /></Link></div>:  <div className="d-flex flex-row align-items-center"><Link to={"/logout"} className="nav-link"><li className="items">logout</li></Link>

                <Link to={"/card"} className="nav-link">
                    <img className="rounded-circle" src={`http://localhost:4000/${Player.img}`} alt={Player.name} width={"70px"} /></Link></div>

            }

        </ul>
        </nav>
    </Container>

  )
}

const Container = styled.div`
nav {
    position: relative;
    width: 100%;
    height: 50px;
    background: #d7d9db;
}

.list {
    list-style-type: none;
    background: #d7d9db;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
}
.items {
    margin-right: 20px;
    font-size: 16px;
    font-weight:bold;
    text-transform: uppercase;
    color: white;
    cursor: pointer;
}

.items:hover{
    color:black;
}
`