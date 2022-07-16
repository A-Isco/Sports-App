import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";
import React from 'react'


import axios from "axios";
import ReactStars from "react-rating-stars-component";

let PlaceCard = ({place}) => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };


    return (
        <div className="container background py-4 text-center w-25 m-5 ">
            <div className="card card-width">
                <div className="card-body place">

                    <img src={place.profile} alt={place.name} width="300" height="250" className="m-5"/>
                    <h4 className="card-title p-3">{` ${place.name}`}</h4>
                    <p>{` ${place.region}`}</p>
                    <p>{` ${place.address}`}</p>
                    <p>{` ${place.rate}`}</p>

                    <div className="d-flex justify-content-center">

                        <ReactStars
                            count={5}
                            // onChange={ratingChanged}
                            size={30}
                            edit={false}
                            value={place.rate}
                            isHalf={true}
                            activeColor="#ffd700"

                        />
                    </div>
                    <h6>{` ${place.price} LE/h`}</h6>

                    <Link to={`/football/places/${place._id}`}> show more</Link>

                </div>
            </div>
        </div>
    );
};

export default PlaceCard;
