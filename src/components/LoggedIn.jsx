import React from "react"
import facade from "../apiFacade.js"

export default function LoggedIn({ setLoggedIn, setUser }) {

    const logout = () => {
        facade.logout()
        setLoggedIn(false)
        setUser("")
    }

    return (
        <div className="login-container">
            <button onClick={logout}>Logout</button>
        </div>
    )
}
