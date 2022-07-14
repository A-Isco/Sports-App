import React from 'react'
import styled from "styled-components"
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Container>
        <nav>
        <ul className="list">
            <NavLink to={"/login"} className="nav-link"><li className="items">LOGIN</li></NavLink>
            <NavLink to={"/signup"} className="nav-link"><li className="items">REGISTER <img src="images/bnyadam.png" alt="human" width={"70px"} /></li></NavLink>
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