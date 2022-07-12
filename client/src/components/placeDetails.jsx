import { useEffect, useState } from "react";
import React from "react";
import {Link, NavLink} from "react-router-dom";

import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'

import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import PlaceCard from "./placeCard";

let PlaceDetails = () => {




    let [place, setPlace] = useState([]);
    let [rating, setrating] = useState(0);
    let [comment, setcomment] = useState("");

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


    const createReview = (event) => {
        // event.preventDefault();
        const headers = {
            "Content-Type": "application/json",

        };
        axios
            .post(`http://127.0.0.1:4000/api/places/football/${placeId}/review`, {rating,comment},{ headers })
            .then((res) => {
                console.log(res);
            });


    };

     console.log(place);
    const ratingChanged = (newRating) => {
        console.log(newRating);
        setrating(newRating);
    };
    const handleChange = (event) => {

            setcomment(event.target.value);

        console.log(comment);
    };

    return (
        <div className="  d-flex justify-content-center m-5 ">
            <div className="card w-75">
                <div className="card-body place d-flex flex-wrap justify-content-around m-5">
                     <div >
                    <img src={place.profile} alt={place.name} width="400" height="300" className="m-5"/>
                     </div>
                    <div className="text-center ">
                    <h4 className="card-title p-3">{` ${place.name}`}</h4>
                    <p>{` ${place.region}`}</p>
                    <p>{` ${place.address}`}</p>
                    <p>{` description:
                     ${place.description}`}</p>
                    <p>{` ${place.rate}`}</p>

                    <div  className="d-flex justify-content-center">

                        { place.rate!==undefined?<ReactStars
                            count={5}
                            // onChange={ratingChanged}
                            size={30}
                            edit={false}
                            value={place.rate}
                            isHalf={true}
                            activeColor="#ffd700"

                        />:null}


                    </div>
                    <h6>{` ${place.price} LE/h`}</h6>
                        <button className="btn-primary btn w-100">
                            book now
                        </button>

                    </div>

                </div>
                <div className="d-flex flex-wrap justify-content-around">
                    {  place.images?.map((image)=>{
                         return <img className="m-5 p-5"  src={image} width="300" height="250"/>

                    })}

                </div>
                <div className="review form-control">
                    <h3> add your review</h3>
                        <div className= "d-flex " >


                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={30}
                        edit={true}
                        // value={place.rate}
                        isHalf={true}
                        activeColor="#ffd700"

                    />
                        </div>
                    <form onSubmit={createReview}>
                    <textarea placeholder="entet your review"   onChange={handleChange} className="form-control w-100"></textarea>
                        <div className="d-flex justify-content-end">
                  <button  className="btn btn-primary mt-3" type="submit">submit</button>
                        </div>
                    </form>


                <div>
                <h2>Reviews</h2>

                {place.reviews?.length === 0 && <div>No Reviews</div>}
                <ListGroup variant='flush'>
                    <div>
                    {place.reviews?.map((review) => (
                        <ListGroup.Item key={review._id}>
                            {/*<strong>{review.name}</strong>*/}
                            {/*<p>{review.rating}</p>*/}
                            <div className="">
                            {review.rating!==undefined?
                            <ReactStars value={review.rating} isHalf={true} edit={false} />:null}
                            </div>
                            <div className=" d-flex justify-content-end">
                            <p>{review.createdAt.substring(0, 10)}</p>
                                </div>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    </div>
                </ListGroup>

                </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetails;
