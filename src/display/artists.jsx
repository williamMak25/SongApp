import React from 'react'
import { useData } from '../context/fetchDataContext'
import { NavLink } from 'react-router-dom'
import '../App.css'
import {FaAngleDoubleLeft } from "react-icons/fa";

export const Artists = () => {
    const {artists} = useData()
  return (
    <div className='h-screen w-full overflow-hidden'>
       <div className='mx-20 mt-3 flex flex-row items-center justify-between max-sm:mx-5 max-md:justify-start'>
            <NavLink to='/'><FaAngleDoubleLeft className='text-green-400 text-xl max-sm:mr-5'/></NavLink>
            <p className='text-2xl text-green-500'>Popular Artists</p>
        </div> 
        <div className='mx-2 my-2 p-2 grid grid-cols-4 gap-2 h-full overflow-auto scroll_disable pb-20 w-full max-md:grid-cols-3 max-sm:grid-cols-2 max-sm:mx-0'>
            {artists?.map( artist =>{
                return(
                <NavLink to={`/artist/${artist.id}`}>
                <div className='bg-zinc-800 mx-2 rounded p-2' key={artist.id}>
                    <img src={artist.images[2].url} className='mx-auto w-full mt-1 rounded'/>
                    <p className='ml-2 mt-3 text-xl text-green-400 text-center'>{artist.name}</p>
                    <p className='ml-3 opacity-70 text-center'>{artist.type}</p>
                </div></NavLink>)
            })}
        </div>
    </div>
  )
}
