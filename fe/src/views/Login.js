import React from 'react'
import {Button, Input, Box} from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {useValue} from '../Context'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      
    const {dt,setDt} = useValue()
    const navigate = useNavigate()
      return (
        <form onSubmit={handleSubmit(async (data) => {
            const r = await axios.post("https://nodejs-fake-api.herokuapp.com/login",data)
            await setDt(r.data)
            await console.log(dt)
            navigate("/")
            })}>
          <Box sx={{display:"flex", flexDirection:"column"}}>
          <Input type="username" placehoder="username" {...register('username', { required: true })} />
          {errors.username && <p>Username is required.</p>}

          <Input type="password" placeholder='password' {...register('password', { required: true })} />
          {errors.password && <p>password is required.</p>}

          <Button type="submit" variant="contained">Login</Button>
          </Box>
        </form>
      )
}

export default Login