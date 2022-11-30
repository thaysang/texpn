import React, {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Users from './views/Users'
import {Provider} from './Context'
import {useBeforeUnload} from 'react-use'

const App = () => {
    const [dt, setDt] = useState({})

    useEffect(()=>{
        console.log("Load first time")
    },[])

    useBeforeUnload(()=>{
        console.log("Before Unload")
    })

    return <Provider value={{dt,setDt}}>
<Routes>
    <Route path='/' element = {<Home />}/>
    <Route path='/login' element = {<Login />}/>
    <Route path='/users' element = {<Users />}/>
</Routes>
</Provider>
}
export default App