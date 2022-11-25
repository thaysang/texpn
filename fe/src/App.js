import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Users from './views/Users'
import {Provider} from './Context'
const App = () => {
    const [dt, setDt] = useState({})
    return <Provider value={{dt,setDt}}>
<Routes>
    <Route path='/' element = {<Home />}/>
    <Route path='/login' element = {<Login />}/>
    <Route path='/users' element = {<Users />}/>
</Routes>
</Provider>
}
export default App