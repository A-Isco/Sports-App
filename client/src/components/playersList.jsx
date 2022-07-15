import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react'
import PlayerCard from "./playerCard";
import {useParams} from "react-router-dom";

let PlayerList = () => {
    const  {Sport}=useParams()
    let [players, setPlayers] = useState([]);
    let [regions, setRegions] = useState([]);
    let [pageNumber, setPageNumber] = useState(0);
    let [numberOfPages, setNumberOfPages] = useState(0);
    let [pages, setPages] = useState([]);
    let [searchFlag, setSearchFlag] = useState(0);

    // Search Query
    const [query, setQuery] = useState("");

    // Filters
    // const [rate, setRate] = useState("");
    const [region, setRegion] = useState("");
    const [sortAttribute, setSortAttribute] = useState("");
    const [sortWay, setSortWay] = useState("");

    //Sort
    const [rateSort, setRateSort] = useState("");
    const [ageSort, setAgeSort] = useState("");

    // default data
    const fetchRetrieveData = async () => {
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

        };
        const res = await axios.get(
            `http://localhost:4000/api/players/${Sport}?page=${pageNumber}`,{headers}
        );
        setNumberOfPages(res.data.totalPages);
        setPlayers(res.data.players);
        console.log(players)
        console.log(res)
    };

    // ****** Search Fn *********
    const fetchSearchData = async () => {
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

        };
        const res = await axios.get(
            `http://localhost:4000/api/players/${Sport}/search?q=${query}&page=${
                pageNumber + 1
            }}`,{headers}
        );
        setNumberOfPages(res.data.totalPages);
        setPlayers(res.data.players);
    };

    // ****** Filter Fn *********
    const fetchFilteredData = async () => {
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

        };
        const res = await axios.get(
            `http://localhost:4000/api/players/${Sport}/filter?region=${region}&sortAttribute=${sortAttribute}&sortWay=${sortWay}&page=${
                pageNumber + 1
            }}`,{headers}
        );
        setNumberOfPages(res.data.totalPages);
        setPlayers(res.data.players);
    };

    // ****** Sort Fn *********
    // const fetchSortedData = async () => {
    //     const res = await axios.get(
    //         `http://localhost:4000/api/players/sort?rateSort=${rateSort}&ageSort=${ageSort}&page=${
    //             pageNumber + 1
    //         }}`
    //     );
    //     setNumberOfPages(res.data.totalPages);
    //     setPlayers(res.data.players);
    // };

    // useEffect number of pages (( Pagination ))
    useEffect(() => {
        setPages(new Array(numberOfPages).fill(null).map((v, i) => i));
    }, [numberOfPages]);

    useEffect(() => {
        let token=String(localStorage.getItem('sports_token'))
        const headers = {
            "Content-Type": "application/json",
            authorization:`token ${token}`

        };

        axios
            .get("http://localhost:4000/api/regions/"  , {
                headers,
            })
            .then((res) => {
                console.log(res.data)


                setRegions(res.data)
            });
        if (query.length === 0 && sortAttribute.length===0&& region.length===0) {
            fetchRetrieveData();
        }
        else if(sortAttribute.length===0|| region.length===0)
        {
            fetchFilteredData();
        }

    }, [pageNumber, query])

    // Search
    useEffect(() => {

        if (query.length !== 0) {
            fetchSearchData();
        }
    }, [pageNumber, searchFlag]);


    // Next and Previous Functions
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };
    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };

    const handleKeyDown=(e)=>
    { if(e.key==="Enter")
    {
        if (query.length !== 0) {
            setPageNumber(0);
        }
        if (searchFlag === 0) {
            setSearchFlag(1);
        }
        if (searchFlag === 1) {
            setSearchFlag(0);
        }
    }}

    // Return Component
    return (
        <div>
            <div className="d-flex flex-wrap justify-content-between m-5">




                {/* Filter Button */}
                <div className="d-flex flex-wrap justify-content-around">


                    {/*  region drop menu */}
                    <select className="m-3"
                            name="region-filter"
                            id="region-filter"
                            onChange={(e) => setRegion(e.target.value)}
                    >
                        <option value="" disabled selected hidden className="text-center p-3" >filter by region</option>

                        <option value="">
                            none
                        </option>
                        {regions.length!==0?regions.map((region)=>{
                           return  <option key={region._id} value={region.name}>{region.name}</option> ;


                        }):null

                        }



                    </select>

                    {/*   sortAttribute drop menu */}
                    <select className="m-3"
                            name="sortAttribute"
                            id="sortAttribute"
                            onChange={(e) => setSortAttribute(e.target.value)}
                    >
                        <option value="" disabled selected hidden>sort by</option>
                        <option  value="">
                            none
                        </option>
                        <option value="rate">rate</option>
                        <option value="age">age</option>
                    </select>

                    {/*   sortWay drop menu */}
                    <select className="m-3"
                            name="sortAttribute"
                            id="sortAttribute"
                            onChange={(e) => setSortWay(e.target.value)}
                    >
                        <option value="" disabled selected hidden className="text-center p-3" >sort way</option>
                        <option  value="">
                            none
                        </option>
                        <option value="asc">asc</option>
                        <option value="desc">desc</option>
                    </select>

                    <button className="m-3"
                            onClick={() => {
                                if (region == "" && sortAttribute == "" && sortWay == "") {
                                    console.log("works none");
                                    setPageNumber(0);
                                    fetchRetrieveData();
                                } else {
                                    setPageNumber(0);
                                    fetchFilteredData();
                                }
                            }}
                    >
                        apply
                    </button>
                </div>

                <div>
                    <input
                        className="search"
                        placeholder="Search..."
                        onChange={(e) => setQuery(e.target.value.toLowerCase())}

                        onKeyDown={handleKeyDown}/>
                </div>
            </div>

            {
                <div>

                    <div className="d-flex flex-wrap justify-content-around
                     ">
                        {players.map((player) => {
                            return <PlayerCard  key={player._id} player={player} />;
                        })}
                    </div>

                    <ul className="pagination  pagination-lg justify-content-end m-5 px-5">
                        <li className="page-item">
                            <button className="page-link"   onClick={gotoPrevious} aria-label="Previous">

                                <span aria-hidden="true">&laquo;</span>

                            </button>
                        </li>
                        {pages.map((pageIndex) => (
                            <li className="page-item"><button className="page-link" key={pageIndex} onClick={() => setPageNumber(pageIndex)}>{pageIndex + 1}</button></li>

                        ))}


                        <li className="page-item">
                            <button className="page-link" onClick={gotoNext} aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>

                            </button>
                        </li>
                    </ul>





                </div>

            }
        </div>
    );
};

export default PlayerList;