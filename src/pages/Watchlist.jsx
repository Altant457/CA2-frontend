import React from "react"
import facade from "../apiFacade.js";

const Watchlist = ({ user, watchlist, setWatchlist, loggedIn }) => {

  const htmlDecode = (input) => {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  const removeFromWatchlist = (e) => {
    e.preventDefault()
    let body = {
      username: user,
      animeId: e.target[0].value
    }
    facade.removeAnimeFromWatchlist(body)
        .then(res => {
          setWatchlist(res)
          alert("Anime removed from watchlist")
        })
  }

  return (
      <>
        <h1 className={"ms-3 mt-3"}>My watchlist</h1>
        <ul className={"list-group"}>
          {watchlist.map(anime => (
              <li key={anime.id} className={"list-group-item d-flex justify-content-between align-items-center"}>
                <form onSubmit={removeFromWatchlist}>
                  <div className={"ms-2 my-4 me-auto"}>
                    <div>
                      <img src={anime.posterURL} className={"img-thumbnail float-start"} alt={anime.synopsis} width={284}
                           height={402}/>
                      <div className={"fw-bold text-nowrap"}>
                        <div className={"fs-1"}>{anime.name}</div>
                        <div>
                          Airdate: {anime.startDate !== "" && <>{anime.startDate}</>} {anime.endDate !== "" && (<>to {anime.endDate}</>)}
                        </div>
                        <div>Status: {(anime.status[0].toUpperCase() + anime.status.substring(1))}</div>
                        <div className={"fs-4"}>Synopsis</div>
                      </div>
                      <div>{htmlDecode(anime.synopsis)}</div>
                      {loggedIn && (
                          <>
                            <input type={"hidden"} value={anime.id}/>
                            <button type={"submit"} className={"btn btn-primary"}>
                              <span>Remove from watchlist</span>
                            </button>
                          </>
                      )}
                    </div>
                  </div>
                </form>
              </li>
          ))}
        </ul>
      </>
  )
}


export default Watchlist
