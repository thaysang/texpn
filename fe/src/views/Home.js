import React from 'react'
import {Link} from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import {useValue} from '../Context'
import {Box,Button, Avatar, Card, CardMedia,  Typography} from '@mui/material'

const fetcher = url => axios.get(url).then(res => res.data)

const Home = () => {
    const {dt,setDt} = useValue()
    const { data, error } = useSWR('https://3000-sangltv-texpn-crfiapqiw75.ws-us78.gitpod.io/', fetcher)
    
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
    <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
        {
            data.map((item, index)=> <Card key={index} sx={{border:"1px dashed black", margin: 2, width:200, alignItems:"center", justifyContent:"center"}}>
                <CardMedia image={item.img} sx={{width:100,height:100}}/>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h4">{item.price}$</Typography>
                <Button variant="contained">AddTocard</Button>
            </Card>)
        }
    </Box>
</div>}


export default Home