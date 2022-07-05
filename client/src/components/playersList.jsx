import { useEffect, useState } from "react";
import axios from "axios";

let PlayerList = () => {
  let [players, setPlayers] = useState([]);
  let [pageNumber, setPageNumber] = useState(0);
  let [numberOfPages, setNumberOfPages] = useState(0);
  let [pages, setPages] = useState([]);
  let [searchFlag, setSearchFlag] = useState(0);

  const [query, setQuery] = useState("");

  // let pages = new Array(numberOfPages).fill(null).map((v, i) => i);

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
      `http://localhost:4000/api/players/search?q=${query}&page=${
        pageNumber + 1
      }}`
    );
    setNumberOfPages(res.data.totalPages);
    setPlayers(res.data.players);
  };

  // useEffect number of pages
  useEffect(() => {
    setPages(new Array(numberOfPages).fill(null).map((v, i) => i));
  }, [numberOfPages]);

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
