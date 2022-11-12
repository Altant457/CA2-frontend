import React, { useRef, useState } from 'react'
import facade from "../apiFacade.js"

const Search = ({ loggedIn, user }) => {

  const inputRef = useRef()
  const [query, setQuery] = useState("")
  const [searcResults, setSearcResults] = useState([])

  const htmlDecode = (input) => {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  const searchHandler = (e) => {
    e.preventDefault()
    if(loggedIn) {
      console.log(query);
      facade.getMultiAnime(query, user)
          .then(setSearcResults);
    }
  }

  const changeHandler = () => {
    setQuery(inputRef.current.value)
  }

  const addToWatchlist = (e) => {
    e.preventDefault()
    let body = {
      username: user,
      anime: {
        id: e.target[0].value,
        name: e.target[1].value,
        startDate: e.target[2].value,
        endDate: e.target[3].value,
        status: e.target[4].value,
        posterURL: e.target[5].value,
        synopsis: e.target[6].value
      }
    }
    facade.addAnimeToWatchlist(body)
        .then(() => {
          alert("Anime added to watchlist (unless already added)")
        })
  }

  return (
      <>
        <h1 className={"ms-3 mt-3"}>Search for an anime</h1>
        <form onSubmit={searchHandler} className={"ms-3 mt-3"}>
          <input
              ref={inputRef}
              required
              onChange={changeHandler}
              type="search"
              placeholder="Search...."
          />
          <button type="submit" >Search</button>
        </form><br /><br />
        <ul className="list-group">
          {searcResults.map(anime => (
            <li key={anime.id} className={"list-group-item d-flex justify-content-between align-items-center"}>
              <form onSubmit={addToWatchlist}>
                <div className={"ms-2 my-4 me-auto"}>
                  <div>
                    <img src={anime.posterURL} className={"img-thumbnail float-start"} alt={anime.synopsis} width={284}
                            height={402}/>
                    <div className={"fw-bold text-nowrap"}>
                      <div className={"fs-1"}>{anime.name}</div>
                      <div>Airdate: {anime.startDate} {anime.endDate !== "" && (<>to {anime.endDate}</>)}</div>
                      <div>Status: {(anime.status[0].toUpperCase() + anime.status.substring(1))}</div>
                      <div className={"fs-4"}>Synopsis</div>
                    </div>
                    <div>{htmlDecode(anime.synopsis)}</div>
                    {loggedIn && (
                        <>
                          <input type={"hidden"} value={anime.id}/>
                          <input type={"hidden"} value={anime.name}/>
                          <input type={"hidden"} value={anime.startDate}/>
                          <input type={"hidden"} value={anime.endDate}/>
                          <input type={"hidden"} value={anime.status}/>
                          <input type={"hidden"} value={anime.posterURL}/>
                          <input type={"hidden"} value={anime.synopsis}/>
                          <button type={"submit"} className={"btn btn-primary"}>
                            <span>Add to watchlist</span>
                          </button>
                        </>
                    )}
                  </div>
                </div>
              </form>
            </li>
        ))}
        </ul>
        <br />
      </>
  );
};

export default Search;
