import styled from "styled-components"
import React, {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
      }

    useEffect(() => {

    const changeWidth = () => {
        setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
        window.removeEventListener('resize', changeWidth)
    }

    }, [])

    return (
    <Container>
    <nav>
        {(toggleMenu || screenWidth > 600) && (
            <ul className="list">
                <NavLink to={"/home"} className="nav-link">
                    <li className="items">Home</li>
                </NavLink>
                <NavLink to={"/sports"} className="nav-link">
                    <li className="items">Sports</li>
                </NavLink>
                <NavLink to={"/about-us"} className="nav-link">
                    <li className="items">About Us</li>
                </NavLink>
            </ul>
        )}

        <button onClick={toggleNav} className="btn"><img src="images/expand1.jpg" alt="expand" /></button>
    </nav>
    </Container>
    )
}

const Container = styled.div`
nav {
    position: relative;
    top: 0;
    width: 100%;
    min-height: 70px;
    background: #759cd0;
}

.list {
    list-style-type: none;
    background: #759cd0;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
    padding-top:17px;
    margin-right: 20%;
    margin-bottom:0;
}
.items {
    margin-right: 20px;
    font-size: 25px;
    font-weight: bold;
    text-transform: uppercase;
    color: #f1f1f1;
    cursor: pointer;
}

.items:hover{
    color:black;
}

.btn {
    display: none;
    position: absolute;
    right: 10px;
    top: 7px;
    padding: 5px;
    color: #000;
    font-size: 18px;
}

@media screen and (max-width: 600px){
    .list {
        flex-direction: column;
        height: auto;
    }
    .items:nth-child(1){
        border-top: 1px solid rgba(255, 255, 255, 0.555);
        margin-top: 50px;
    }
    .items {
        width: 100%;
        border-top: 1px solid rgba(255, 255, 255, 0.555);
        text-align: center;
        margin-right: 0px;
        padding: 20px 0;
    }
    .btn {
        display: block;
    }
    .btn img{
        width: 30px;
    }
}
`