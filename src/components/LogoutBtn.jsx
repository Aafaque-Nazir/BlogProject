import React from 'react'
import { useDispatch } from 'react-redux'
import {Logout} from './store/authSlice'
import authService from '../../Appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch();

    const LogoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(Logout())
        })
    }
        
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={LogoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
