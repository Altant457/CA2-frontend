import React from "react"
import { useParams } from "react-router-dom"
import facade from "../apiFacade.js";

const Anime = () => {
  const test1 = () => {
    facade.getSingleAnime("162")
        .then(console.log)
  }

  const test2 = () => {
    facade.getMultiAnime("initial d")
        .then(console.log)
  }

  const test3 = () => {
    const body = {
      username: "altant",
      anime: {
        id: 162,
        name: "Initial D First Stage",
        startDate: "1998-04-19",
        endDate: "1998-12-06",
        status: "finished",
        posterURL: "https://media.kitsu.io/anime/poster_images/162/small.jpg",
        synopsis: "Takumi Fujiwara is an aloof, spacey high-schooler who does delivery runs in his dad's Toyota AE86 in the dead of night. Despite working at a gas station and having friends who are car nuts, he doesn't know a single thing about cars.\nTakumi is introduced into the world of street racing and his natural talent draws attention from all across Gunma. Will Takumi face the challenges or back out from the call of the mountain passes?"
      }
    }
    facade.addAnimeToWatchlist(body)
        .then(console.log)
  }

  const test4 = () => {
    const body = {
      username: "altant",
      animeId: 162
    }
    facade.removeAnimeFromWatchlist(body)
        .then(console.log)
  }

  return (
      <div>
        <button onClick={test1}>Test single anime</button><br /><br />
        <button onClick={test2}>Test multi anime</button><br /><br />
        <button onClick={test3}>Test add anime to watchlist</button><br /><br />
        <button onClick={test4}>Test remove anime from watchlist</button><br /><br />
      </div>
  )
}


export default Anime
