import React from 'react'
import { useData } from '../context/fetchDataContext'
import { Outlet, useNavigate } from 'react-router-dom'
import { ErrorPage } from './errorPage'

export const ProtectRoute = ({children}) => {
    const {error} = useData()
    const navigate = useNavigate()
   
  return (
    error ? <ErrorPage/> : <Outlet/>
  )
}
