import { useEffect, useState } from "react";
import axios from "axios";

let PlayerList = () => {
  let [pageNumber, setPageNumber] = useState(0);
  let [players, setPlayers] = useState([]);
  let [numberOfPages, setNumberOfPages] = useState(0);
  let [searchFlag, setSearchFlag] = useState(0);
  // let [pages, setPages] = useState([]);

  const [query, setQuery] = useState("");

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  // default data
  const fetchRetrieveData = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/players?page=${pageNumber}`
    );
    setNumberOfPages(res.data.totalPages);
    setPlayers(res.data.players);
  };

  // search
  const fetchSearchData = async () => {
    const res = await axios.get(
      `http://localhost:4000/api/players/search?q=${query}&page=${pageNumber}}`
    );
    setNumberOfPages(res.data.totalPages);
    setPlayers(res.data.players);
  };

  // Retrieve all
  useEffect(() => {
    if (query.length === 0) {
      fetchRetrieveData();
    }
  }, [pageNumber, query]);

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

  // Return Component
  return (
    <div>
      <div>Players List </div>
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <button
        onClick={() => {
          if (searchFlag === 0) {
            setSearchFlag(1);
          }
          if (searchFlag === 1) {
            setSearchFlag(0);
          }
          if (query.length !== 0) {
            setPageNumber(1);
          }
        }}
      >
        Search
      </button>
      <h3>Page Number : {pageNumber + 1}</h3>
      {
        <div>
          {players.map((item) => (
            <div key={item._id}>
              <h1>{item.name}</h1>
            </div>
          ))}

          <button onClick={gotoPrevious}>Previous</button>
          {pages.map((pageIndex) => (
            <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </button>
          ))}
          <button onClick={gotoNext}>Next</button>
        </div>
      }
    </div>
  );
};

export default PlayerList;
