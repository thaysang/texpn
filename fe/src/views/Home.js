import React from 'react'
import {Link} from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'


const fetcher = url => axios.get(url).then(res => res.data)

const Home = () => {
    const { data, error } = useSWR('https://nodejs-fake-api.herokuapp.com/products', fetcher)
    
    if (error) return <h1>error: {error.message}</h1>
    if (!data) return <h1>Loading...</h1>

    return <div>
    <Link to="/login">Login</Link>
    <div>
        {
            data.map((item, index)=> <div key={index}>
                <h4>{item.name}</h4>
            </div>)
        }
    </div>
</div>}


export default Home