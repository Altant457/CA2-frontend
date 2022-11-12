import BASE_URL from "./settings.js"

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json()
}

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }
  const loggedIn = () => {
    return getToken() != null
  }
  const logout = () => {
    localStorage.removeItem("jwtToken")
    document.querySelector("#welcomeUser").innerHTML = `Welcome`
  }

  const findPokemon = (query) => {
    const opts = makeOptions("POST", true, {query: query})
    return fetch(BASE_URL + "/info/pokemon", opts)
      .then(handleHttpErrors)
      .catch(handleErrors)
  }

  const getSingleAnime = async (id) => {
    const opts = makeOptions("POST", true, {id: id})
    try {
      const res = await fetch(BASE_URL + "/info/anime/single", opts)
      return handleHttpErrors(res)
    } catch(err) {
      handleErrors(err)
    }
  }

  const getMultiAnime = async (query, username) => {
    const opts = makeOptions("POST", true, {query: query, username: username})
    try {
      const res = await fetch(BASE_URL + "/info/anime/multi", opts)
      return handleHttpErrors(res)
    } catch(err) {
      handleErrors(err)
    }
  }

  const addAnimeToWatchlist = async (body) => {
    const opts = makeOptions("POST", true, body)
    try {
      const res = await fetch(BASE_URL + "/info/user/watchlist/add", opts)
      const data = await handleHttpErrors(res)
      setToken(data.token)
      return data
    } catch(err) {
      handleErrors(err)
    }
  }

  const removeAnimeFromWatchlist = async (body) => {
    const opts = makeOptions("POST", true, body)
    try {
      const res = await fetch(BASE_URL + "/info/user/watchlist/remove", opts)
      const data = await handleHttpErrors(res)
      setToken(data.token)
      return data
    } catch(err) {
      handleErrors(err)
    }
  }

  const login = (user, password) => {
    const opts = makeOptions("POST", true, {username: user, password: password})
    return fetch(BASE_URL + "/login", opts)
      .then(handleHttpErrors)
      .then(res => {
        const fixedName = user[0].toUpperCase() + user.substring(1)
        document.querySelector("#welcomeUser").innerHTML = `Welcome, ${fixedName}`
        setToken(res.token)
      })
  }

  const createUser = (user, password) => {
    const opts = makeOptions("POST", false, {userName: user, userPass: password})
    return fetch(BASE_URL + "/info/signup", opts)
        .then(handleHttpErrors)
  }

  const fetchData = () => {
    const opts = makeOptions("GET", true)
    return fetch(BASE_URL + "/info/user", opts).then(handleHttpErrors)
  }

  const handleErrors = (err) => {
    if(err.status) {
      err.fullError.then(e => console.log(e.message))
    } else {
      console.log("Network Error")
    }
  }

  const makeOptions= (method, addToken, body) => {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken()
    }
    if (body) {
      opts.body = JSON.stringify(body)
    }
    return opts
  }
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    createUser,
    fetchData,
    findPokemon,
    getSingleAnime,
    getMultiAnime,
    addAnimeToWatchlist,
    removeAnimeFromWatchlist
  }
}
const facade = apiFacade()
export default facade
