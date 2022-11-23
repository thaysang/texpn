import React from 'react'
import {Button, Input, Box} from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      return (
        <form onSubmit={handleSubmit((data) => {
            axios.post("https://nodejs-fake-api.herokuapp.com/login",data).then(r => console.log(r))
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