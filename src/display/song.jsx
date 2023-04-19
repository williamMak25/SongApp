import React from 'react'
import { useData } from '../context/fetchDataContext'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export const Song = () => {
    const {tracks} = useData()
    console.log(tracks)
  return (
    <div className='h-screen overflow-auto w-full'>
        <div className='flex flex-row justify-start items-center p-5'>
            <NavLink to='/'><FaAngleDoubleLeft className='text-green-400 text-2xl mt-1 mx-2'/></NavLink>
            <p className='text-3xl text-green-400 mx-5'>Song For You</p>
            
        </div>
        
        {tracks ? tracks.map( trs => {
            return trs?.tracks.map( song => {
                return(
                    <div className='flex flex-row justify-between mx-5 my-2 bg-zinc-800 py-2 px-5 rounded-lg items-center text-green-400'>
                        <img src={song?.album.images[2].url} className='h-10'/>
                        <p className='text-center text-sm'>{song?.name}</p>
                        <p className='text-center text-sm'>{song?.artists[0].name}</p>
                    </div>
                )
            })
        }) : null }
    </div>
  )
}
