import React, { useState } from 'react'
import facade from "../apiFacade.js"

const Login = ({ setLoggedIn, setErrorMsg, setUser, setWatchlist }) => {
    const init = {username: "", password: ""}
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }

    const login = (user, pass) => {
        facade.login(user, pass)
            .then(res => {
                setLoggedIn(true)
                setUser(user)
                setWatchlist(res)
            })
    }

    const onChange = (evt) => {
        setLoginCredentials({...loginCredentials, [evt.target.id]: evt.target.value})
    }


    return (
        <div className="login-container">
            <form>
                <input onChange={onChange} type="text" placeholder="Username" id="username"/>{" "}
                <input onChange={onChange} type="password" placeholder="Password" id="password"/>
                <button onClick={performLogin} type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
