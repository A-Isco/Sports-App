import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";
import React from 'react'


import axios from "axios";
import ReactStars from "react-rating-stars-component";

let PlayerCard = ({player}) => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };


    return (
        <div className="container background py-4 text-center w-25 m-5 ">
            <div className="card card-width">
                <div className="card-body place">

                    <img src={player.image} alt={player.name} width="300" height="250" className="m-5"/>
                    <h4 className="card-title p-3">{` ${player.name}`}</h4>
                    <p>{` ${player.region}`}</p>
                    <p>{` ${player.rate}`}</p>

                    <div className="d-flex justify-content-center">

                        <ReactStars
                            count={5}

                            size={30}
                            edit={false}
                            value={player.rate}
                            isHalf={true}
                            activeColor="#ffd700"

                        />
                    </div>
                    <h6> {player.age} </h6>

                    {/*<Link to={`/football/places/${place._id}`}> show more</Link>*/}

                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
