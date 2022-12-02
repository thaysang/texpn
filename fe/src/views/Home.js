import React from 'react'
import {Link} from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import {useValue} from '../Context'
import {Box,Button, Avatar} from '@mui/material'

const fetcher = url => axios.get(url).then(res => res.data)

const Home = () => {
    const {dt,setDt} = useValue()
    const { data, error } = useSWR('https://3000-sangltv-texpn-uygyzrg3fer.ws-us77.gitpod.io', fetcher)
    
    if (error) return <h1>error: {error.message}</h1>
    if (!data) return <h1>Loading...</h1>

    return <div>
     {dt && dt.username? <Box sx={{display:"flex",flexDirection:"row"}}>
        <Link to="/users">users</Link>
        <Avatar src={dt.avatar}/>
        <h5>{dt.username}</h5> 
        <Button onClick={()=>{setDt({})}}>Logout</Button>
        </Box> : <Link to="/login">Login</Link>
        }
    <div>
        {
            data.map((item, index)=> <div key={index}>
                <h4>{item.name}</h4>
            </div>)
        }
    </div>
</div>}


export default Home