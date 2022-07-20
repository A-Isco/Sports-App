import {NavLink, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import React from 'react'


import axios from "axios";
import ReactStars from "react-rating-stars-component";
import Modal from "react-modal";

let PlaceCard = ({place}) => {
    let {Sport}=useParams();
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    function openModal() {
        setIsOpen(true);
    }



    function closeModal() {
        setIsOpen(false);
    }
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    const deletePlace = (event) => {
      //event.preventDefault();
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

        };
        axios
            .delete(`http://127.0.0.1:4000/api/places/${place._id}/delete`, { headers })
            .then((res) => {
                console.log(res);
            });


    };


    return (
        <div className="py-4 text-center w-25 m-5 ">
            <div className="card card-width">
                <div className="card-body place">
                    <div className="d-flex justify-content-center">

                    <img src={place.profile?place.profile[0]:null} alt={place.name} width="300" height="250" className="m-5"/>
                    </div>
                    <h4 className="card-title p-3">{` ${place.name}`}</h4>
                    <p>{` ${place.region}`}</p>
                    <p>{` ${place.address}`}</p>
                    {/*<p>{` ${place.rate}`}</p>*/}

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
                     <div> <Link to={`/${Sport}/places/${place._id}`}> show more</Link></div>
                   <div>
                    <Link to={`/${Sport}/${place._id}/edit-place`}className="btn btn-primary m-3"> Edit PLACE</Link>
                       <button className="btn btn-danger m-3" onClick={openModal}>  delete </button>
                   </div>
                    <Modal
                        isOpen={modalIsOpen}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>*/}


                        <form onSubmit={deletePlace}>

                            <div className= "d-flex justify-content-center " >


                                <p> do you want delete {place.name} ?</p>
                            </div>
                            <button className="btn btn-danger m-3" onClick={closeModal}>close</button>
                            <button  className="btn btn-success m-3" type="submit">ok</button>

                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;
