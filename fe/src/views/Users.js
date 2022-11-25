import React from 'react'
import {Link} from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import {useValue} from '../Context'
import {Box,Button, Avatar} from '@mui/material'

const Users = () => {
    const {dt,setDt} = useValue()
    const fetcher = url => axios.get(url, { headers: { Authorization: `Bearer ${dt.accessToken}` }}).then(res => res.data)

    const { data, error } = useSWR('https://nodejs-fake-api.herokuapp.com/users', fetcher)
    
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