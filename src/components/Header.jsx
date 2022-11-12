import React from 'react'
import {NavLink} from "react-router-dom"
import Login from "./Login.jsx"
import LoggedIn from "./LoggedIn.jsx"
import "../styles/header.css"


function Header({setErrorMsg, loggedIn, setLoggedIn, setUser}) {


  return (
      <nav className="topnav">
        <div className="topnavLeft">
          <p id="welcomeUser">Welcome</p>
        </div>
        <div className="topnavMid">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Search anime</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/pokemon">Pokemon</NavLink>
          {!loggedIn ? null : (
              <NavLink to="/anime">Anime</NavLink>
          )}
        </div>
        <div className="topnavRight">
          {!loggedIn ? (<Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} setUser={setUser}/>) :
              (<div>
                <LoggedIn setLoggedIn={setLoggedIn} setUser={setUser} />
              </div>)}
          <NavLink to="/signup">
            <button className="signUp">Sign up</button>
          </NavLink>
        </div>
      </nav>
  )
}

export default Header
