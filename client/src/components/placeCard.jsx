import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
import ReactStars from "react-rating-stars-component";

let PlaceCard = ({ place }) => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    // const applyForJob = () => {
    //     // console.log("apply");
    //     let token = window.localStorage.getItem("token");
    //     const headers = {
    //         "Content-Type": "application/json",
    //         Authorization: "token " + token,
    //     };
    //     let baseUrl = "http://127.0.0.1:8000/api/v1/job/" + job.id + "/apply";
    //     axios
    //         .patch(baseUrl, "", { headers })
    //         .then((response) => {
    //             if (response.data === "done") {
    //                 alert("You applied to the job successfully");
    //             }
    //         })
    //         .catch(({ response }) => {
    //             if (response.status === 400) {
    //                 alert("you cant assign to the same job twice");
    //             }
    //             console.log("err", response);
    //         });
    // };

    // Finish Job
    // const finishJob = () => {
    //     // console.log("finish");
    //     let token = window.localStorage.getItem("token");
    //     let id = window.localStorage.getItem("id");
    //
    //     const headers = {
    //         "Content-Type": "application/json",
    //         Authorization: "token " + token,
    //     };
    //
    //     let baseUrl = `http://127.0.0.1:8000/api/v1/job/${job.id}/finish/${id}`;
    //
    //     axios
    //         .patch(baseUrl, "", { headers })
    //         .then((response) => {
    //             if (response.data === "done") {
    //                 alert("Job Finished Successfully");
    //             }
    //         })
    //         .catch(({ response }) => {
    //             if (response.data === "you are not allowed to finish this job") {
    //                 alert("you are not allowed to finish this job");
    //             }
    //             if (response.data === "you cant finish task that is not in progress") {
    //                 alert("you cant finish task that is not in progress");
    //             }
    //             if (response.data === "there is no such user") {
    //                 alert("there is no such user");
    //             }
    //         });
    // };

    return (
        <div className="container background py-4 text-center w-25 m-5 ">
            <div className="card card-width">
                <div className="card-body place">

                    <img src={place.profile} alt={place.name} width="300" height="250" className="m-5"/>
                    <h4 className="card-title p-3">{` ${place.name}`}</h4>
                    <p>{` ${place.region}`}</p>
                    <p>{` ${place.address}`}</p>
                    <p>{` ${place.rate}`}</p>

<p >



                    <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={30}
                        edit={false}
                        value={place.rate}
                        isHalf={true}
                        activeColor="#ffd700"

                    />
</p>
                    <h6>{` ${place.price} LE/h`}</h6>

                    <Link to="#"> show more</Link>


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
            </div>
        </div>
    );
};

export default PlaceCard;
