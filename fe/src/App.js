import React, {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Users from './views/Users'
import {Provider} from './Context'
import {useBeforeUnload} from 'react-use'
import lf from 'localforage'

const App = () => {
    const [dt, setDt] = useState({})

    useEffect(()=>{
        const getData = async () => {
            const dbt = await lf.getItem('database')
            if (dbt) await setDt(dbt)
        }
        getData()
    },[])

    useBeforeUnload(async ()=>{
        await lf.setItem("database", dt)
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