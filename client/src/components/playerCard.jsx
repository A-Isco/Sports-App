import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";
import React from 'react'
import Modal from 'react-modal';

import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";

let PlayerCard = ({player}) => {
    let [sendedMessage, setMessage] = useState('');
    let [rating, setrating] = useState(0);
    const ratingChanged = (newRating) => {
        console.log(newRating);
        setrating(newRating);
    };

const colors={swimming:"btn-info",football:"btn-warning" ,volleyball:"btn-danger" ,basketball:"btn-success"};
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [messageModalIsOpen, setMessageModalIsOpen] = React.useState(false);
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
    const messageModalStyles={
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            justifyContent: 'center',
            alignItems: 'center'
            
         


        },

    }
    const createReview = (event) => {
        // event.preventDefault();
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

        };
        axios
            .post(`http://127.0.0.1:4000/api/players/${player._id}/review`, {rating},{ headers })
            .then((res) => {
                console.log(res);
            });


    };


    function openMessageModal() {
        setMessageModalIsOpen(true);
    }
    function openModal() {
        setIsOpen(true);
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }
    function closeMessageModal() {
        setMessageModalIsOpen(false);
    }
    function closeModal() {
        setIsOpen(false);
    }

    async function sendMessage(){
        let token=String(localStorage.getItem('sports_token'))
        if(sendedMessage !== ''){
            let chat={
                player2:player._id
            }
            const chatRes = await axios.post(
                `http://localhost:4000/api/v1/chat/contacts/`,chat,{
                  headers: {
                    authorization:`token ${token}`
                  }
                }
              );
              let chatId=chatRes.data.chat._id
              let messageToBeSend={
                message:sendedMessage,
                to:player._id,
                chat:chatId
              }
              const msgRes = await axios.post(
                `http://localhost:4000/api/v1/message/`,messageToBeSend,{
                  headers: {
                    authorization:`token ${token}`
                  }
                }
              );
              
              if(msgRes.data.status==true){ 
                sendedMessage=""
                closeMessageModal()
              }
             
            }
  
      }

    return (
        <div className=" py-4 text-center w-25 m-5 ">
            <div className="card card-width">
                <div className="card-body place">
                    <div className="d-flex justify-content-center">

                    <img src={`http://localhost:4000/${player.img}`} alt={player.name} width="300" height="250" className="m-5"/>
                    </div>
                    <h4 className="card-title p-3">{` ${player.name}`}</h4>
                    <h6> {player.age} </h6>
                    <p>{` ${player.region}`}</p>
                    {/*<p>{` ${player.rate}`}</p>*/}
                    {player.sports?.map((sport,index)=>(
                        <p className={` btn  mx-2  rounded-pill ${colors[sport]}`} >{sport}</p>
                    ))}

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
                    <div className="d-flex justify-content-around">
                     <button className="btn btn-primary rounded-pill px-4" onClick={openModal}>  rate</button>
                        <button onClick={openMessageModal} className="btn btn-primary rounded-pill"> messege</button>

                    </div>


                    {/*<Link to={`/football/places/${place._id}`}> show more</Link>*/}

                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>*/}


                <form onSubmit={createReview}>

                    <div className= "d-flex justify-content-center " >


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
                    <button className="btn btn-danger m-3" onClick={closeModal}>close</button>
                    <button  className="btn btn-success m-3" type="submit">submit</button>

                </form>
            </Modal>
            <Modal
                    isOpen={messageModalIsOpen}
                    onRequestClose={closeModal}
                    style={messageModalStyles}
            >
                
                    <textarea onChange={(e)=>{setMessage(e.target.value)}} value={sendedMessage} style={{'display':'block',width:'200px',height:'100px'}} id='messageContent' placeholder="Enter Your Message Here" ></textarea>
                    <button className="btn btn-danger m-3" onClick={closeMessageModal}>close</button>
                    <button  className="btn btn-success m-3" onClick={sendMessage} type="submit">Send</button>
                
            </Modal>
        </div>
    );
};

export default PlayerCard;
