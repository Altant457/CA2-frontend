import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import Contact from "./pages/Contact.jsx"
import Header from "./components/Header.jsx"
import SignUp from "./components/SignUp.jsx"
import Pokemon from "./pages/Pokemon.jsx"
import Watchlist from "./pages/Watchlist.jsx"
import User from "./pages/User.jsx"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState("");
  const [watchlist, setWatchlist] = useState([]);


  const obj = {
    name: "TestName",
    street: "TestStreet",
    town: "TestTown",
    country: "TestCountry"
  }

  return (
      <>
        <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}
                setUser={setUser} setWatchlist={setWatchlist} />
        <Routes>
          <Route path=""
                 element={<Home />} />
          <Route path="/search"
                 element={<Search loggedIn={loggedIn} user={user}
                                  setWatchlist={setWatchlist} />} />
          <Route path="/contact"
                 element={<Contact address={obj} />} />
          <Route path="/signup"
                 element={<SignUp setLoggedIn={setLoggedIn} />} />
          <Route path="/pokemon"
                 element={<Pokemon/>} />
          <Route path="/watchlist"
                 element={<Watchlist user={user} watchlist={watchlist}
                                     setWatchlist={setWatchlist}
                                     loggedIn={loggedIn} />} />
          <Route path="/user"
                 element={<User />} />
          <Route path="*"
                 element={<h1>Page Not Found !!!!</h1>} />
        </Routes>
      </>
  )
}

export default App
