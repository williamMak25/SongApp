import React from 'react'
import { useData } from '../context/fetchDataContext'

export const ErrorPage = () => {
    const {errorStatus} = useData()
  return (

    <div className='flex flex-col justify-center items-center w-full'>
        <img src='https://i.ibb.co/Dfdpmtp/error.jpg' className='w-52 '/>
        <h1 className='text-xl'>{errorStatus? errorStatus + ' Error' : "Service isn't Available Now"}</h1>
    </div>
  )
}
