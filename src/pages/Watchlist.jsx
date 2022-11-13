import React from "react"
import facade from "../apiFacade.js";

const Watchlist = ({ user, watchlist, setWatchlist, loggedIn }) => {

  const htmlDecode = (input) => {
    let doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  const dynamicSort = (property) => {
    let sortOrder = 1;
    if(property[0] === "-") {
      sortOrder = -1;
      property = property.substring(1);
    }
    return function (a,b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
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
          {watchlist
              .sort(dynamicSort("name"))
              .map(anime => (
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
