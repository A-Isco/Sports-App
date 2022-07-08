import { useEffect, useState } from "react";
import React from "react";
import {Link, NavLink} from "react-router-dom";

import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import PlaceCard from "./placeCard";

let PlaceDetails = () => {




    let [place, setPlace] = useState([]);

    let { placeId } = useParams();
    useEffect(() => {

        console.log(placeId)

        const headers = {
            "Content-Type": "application/json",

        };
        axios
            .get(`http://127.0.0.1:4000/api/places/football/${placeId}`, { headers })
            .then((res) => {
                setPlace(res.data);
            });
    }, []);



     console.log(place);



    return (
        <div className="container background  text-center  m-5 ">
            <div className="card card-width">
                <div className="card-body place d-flex flex-wrap justify-content-around m-5">
                     <div>
                    <img src={place.profile} alt={place.name} width="400" height="300" className="m-5"/>
                     </div>
                    <div>
                    <h4 className="card-title p-3">{` ${place.name}`}</h4>
                    <p>{` ${place.region}`}</p>
                    <p>{` ${place.address}`}</p>
                    <p>{` description:
                     ${place.description}`}</p>
                    <p>{` ${place.rate}`}</p>

                    <p >

                        { place.rate!==undefined?<ReactStars
                            count={5}
                            // onChange={ratingChanged}
                            size={30}
                            edit={false}
                            value={place.rate}
                            isHalf={true}
                            activeColor="#ffd700"

                        />:null}


                    </p>
                    <h6>{` ${place.price} LE/h`}</h6>
                        <button className="btn-primary btn w-100">
                            book now
                        </button>

                    </div>


                    {/*<NavLink*/}
                    {/*    to={`/job/${job.id}`}*/}
                    {/*    className="btn btn-outline-primary my-3"*/}
                    {/*    style={{ fontSize: "15px" }}*/}
                    {/*>*/}
                    {/*    Job Details*/}
                    {/*</NavLink>*/}
                    {/*<div>*/}
                    {/*    <button*/}
                    {/*        type="button"*/}
                    {/*        className="btn m-3 btn-success"*/}
                    {/*        onClick={applyForJob}*/}
                    {/*    >*/}
                    {/*        Apply*/}
                    {/*    </button>*/}
                    {/*    <button*/}
                    {/*        type="button"*/}
                    {/*        className="btn m-3 btn-dark"*/}
                    {/*        onClick={finishJob}*/}
                    {/*    >*/}
                    {/*        Finish*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
                <div className="d-flex flex-wrap justify-content-around">
                    {  place.images?.map((image)=>{
                         return <img className="m-5 p-5"  src={image} width="300" height="250"/>

                    })}

                </div>
            </div>
        </div>
    );
};

export default PlaceDetails;
