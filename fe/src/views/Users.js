import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import {useValue} from '../Context'
import {Box,Button, Avatar} from '@mui/material'
import {useBeforeUnload} from 'react-use'
import lf from 'localforage'

const Users = () => {
    const {dt,setDt} = useValue()
    const fetcher = url => axios.get(url, { headers: { authorization: `Bearer ${dt.token}` }}).then(res => res.data)

    const { data, error } = useSWR('https://3000-sangltv-texpn-crfiapqiw75.ws-us78.gitpod.io/users', fetcher)
    
    
    // useEffect(()=>{
    //     const getData = async () => {
    //         const dbt = await lf.getItem('database')
    //         if (dbt) await setDt(dbt)
    //     }
    //     getData()
    // },[])

    // useBeforeUnload(async ()=>{
    //     await lf.setItem("database", dt)
    // })

    if (error) return <h1>error: {error.message}</h1>
    if (!data) return <h1>Loading...</h1>

    return <div>
     {dt && dt.username? <Box sx={{display:"flex",flexDirection:"row"}}>
        <Link to="/">Home</Link>
        <Avatar src={dt.avatar}/>
        <h5>{dt.username}</h5> 
        </Box> : <Link to="/login">Login</Link>
        }
    <div>
        {
            data.map((item, index)=> <div key={index}>
                <Avatar src={item.avatar}/>
                <h4>{item.username}</h4>
            </div>)
        }
    </div>
</div>}


export default Users