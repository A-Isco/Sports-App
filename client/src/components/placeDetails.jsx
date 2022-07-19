import { useEffect, useState } from "react";
import React from "react";
import {Link, NavLink} from "react-router-dom";
import Select from 'react-select';

import { Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Modal from 'react-modal';

import axios from "axios";
import { Routes, Route, useParams } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import PlaceCard from "./placeCard";
import PaymentCard from "./PaymentCard";

let PlaceDetails = () => {




    let [place, setPlace] = useState([]);
    let [rating, setrating] = useState(0);
    let [comment, setcomment] = useState("");
    let [opponents, setOpponents] = useState([]);
    let [chosenDay, setChosenDay] = useState();
    let [chosenTime, setChosenTime] = useState();
    const [data, setData] = useState('');
    const [confirmModalIsOpen, setConfirmModalIsOpen] = React.useState(false);
    const [bookModalIsOpen, setBookModalIsOpen] = React.useState(false);
    const bookModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width:'400px',
            height:"300px",
            // display:'flex',
            padding:'5px',
            textAlign:'center',
            alignItems: 'center',


        },
    };
    const confirmModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width:'200px',
            height:"200px",
            display:'flex',
            padding:'5px',
            justifyContent: 'center',
            textAlign:'center',
            alignItems: 'center',
        },
    }


    let { placeId } = useParams();
    useEffect(() => {
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

        };

        console.log(placeId)


        axios
            .get(`http://127.0.0.1:4000/api/places/football/${placeId}`, { headers })
            .then((res) => {
                setPlace(res.data);
            });
    }, []);

    const childToParent = (childdata) => {
        setData(childdata);
      }

    const createReview = (event) => {
        // event.preventDefault();
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

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
    let bookPlace=async ()=>{
        let token=String(localStorage.getItem('sports_token'))
        const res = await axios.get(
            `http://localhost:4000/api/v1/reservation/${place._id}`,{
              headers: {
                authorization:`token ${token}`
              }
            }
          );
          if(res.status===200){
          let result = [];
            result = res.data.opponents.reduce((r, a) => {
                r[a.date] = r[a.date] || [];
                r[a.date].push(a);
                return r;
            }, Object.create(null));
            setOpponents(result)
            console.log(result);

          }

          setBookModalIsOpen(true);
    }
    let closeBookModal=()=> {
        setBookModalIsOpen(false);
    }

    let closeConfirmModal=()=>{
        setConfirmModalIsOpen(false);
    }

    let renderTime=()=>{
        if(typeof chosenDay != "undefined" ){
            if( chosenDay !== 'Select'){
          return(
             opponents[chosenDay].map((k) => (
                 <option value={k.time._id}>from:{k.time.from}  to:  {k.time.to}</option>
             ))
        )
    }}


    }
     useEffect(()=>{
        async function sendOpp(){
        let token=String(localStorage.getItem('sports_token'))
        if( data!=='undefined' && chosenTime !=='Select' && chosenTime!=='Select' && typeof chosenTime != "undefined" && typeof chosenDay != "undefined" ){
            // alert('here')
            let timeAndDate={
            payment_token:data,
            place:place._id,
            date: chosenDay,
            time:chosenTime,
        }
        console.log(timeAndDate)
        const res =  await axios.post(
            `http://localhost:4000/api/v1/reservation/`,timeAndDate,{
              headers: {
                authorization:`token ${token}`
              }
            }
          );
          if(res.status===201){
            setBookModalIsOpen(false);
            setConfirmModalIsOpen(true);
            setChosenDay('Select')
            setChosenTime('Select')
            setTimeout(function(){
                setConfirmModalIsOpen(false);
            }, 1500);
          }
        }
        }
        sendOpp()
    },[data])
    let renderPayment=()=>{
        if(  chosenTime !=='Select' && chosenTime!=='Select' && typeof chosenTime != "undefined" && typeof chosenDay != "undefined" ){
        return(<PaymentCard   key={place._id} childToParent={childToParent} product={place}/>)
        }
    }
  
    return (
        <div className="  d-flex justify-content-center m-5 ">
            <div className="card w-75">
                <div className="card-body place d-flex flex-wrap justify-content-around m-5">
                     <div >
                    <img src={place.profile?place.profile[0]:null} alt={place.name} width="400" height="300" className="m-5"/>
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
                        <button onClick={bookPlace} className="btn-primary btn w-100">
                            book now
                        </button>

                    </div>

                </div>
                <div className="d-flex flex-wrap justify-content-around">
                    {  (place.profile?.length>0)? place.profile.slice(1).map((image)=>{
                         return <img className="m-5 p-5"  src={image} width="300" height="250"/>

                    }):null}

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
            <Modal
                    isOpen={bookModalIsOpen}
                    onRequestClose={closeBookModal}
                    style={bookModalStyles}
            >
                <div>
                <label for="day" >Choose The Day</label>
                <select   style={{width:'150px',height:'50px'}} className="m-3" id='day'  onClick={(evt)=>setChosenDay(evt.target.value)}>
                    <option value={null} >Select</option>
                {

                          Object.keys(opponents).map((k,index) => (
                                <option value={k} >{k}</option>
                        ))

                        }
                </select>

                </div>
                <div>
                <label for="day" >Choose The Time</label>
                <select style={{width:'150px',height:'50px'}}  className="m-3"  onClick={(evt)=>setChosenTime(evt.target.value)}>
                <option value={null} >Select</option>

                {
                    renderTime()
                        }
                </select>
                </div>
                <button className="btn btn-danger m-3" onClick={closeBookModal}>close</button>
                {/*<button  className="btn btn-success m-3" onClick={book} type="submit">Book</button>*/}
                {
                    renderPayment()
                    }
                
            </Modal>
            <Modal
                    isOpen={confirmModalIsOpen}
                    onRequestClose={closeConfirmModal}
                    style={confirmModalStyles}
            >
                <h1>Done</h1>
            </Modal>
        </div>
    );
};

export default PlaceDetails;
