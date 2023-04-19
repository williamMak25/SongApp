import React from 'react'
import { NavLink } from 'react-router-dom'
import {HiOutlineSearchCircle} from 'react-icons/hi'
import {AiFillHome} from 'react-icons/ai'
import {MdAudiotrack,MdAlbum} from 'react-icons/md'
import {BsDisc, BsFillMicFill} from 'react-icons/bs'
import {GoFileDirectory} from 'react-icons/go'

export const SideBar = () => {
  return (
    <div className='bg-zinc-900 text-white h-screen w-1/6 max-lg:hidden'>
      <div className='flex flex-row items-center justify-between bg-green-700 m-2 rounded-tl rounded-bl-3xl rounded-br-2xl rounded-tr-3xl'> 
        <p className='text-3xl mx-auto my-2 text-center'>S<BsDisc className='text-zinc-900 text-md mx-1 inline animate-spin'/>ngify</p>        
      </div>

      <p className='mr-5 text-end opacity-70'>Main</p>
      <div className='p-2 m-3 mt-1 text-sm text-start bg-zinc-800 rounded'>
        <NavLink to='/'><li className='list-none my-1 text-green-500'><AiFillHome className='inline text-xl text-white'/> Home</li></NavLink>
        <NavLink to='/search'><li className='list-none my-1 text-green-500'><HiOutlineSearchCircle className='inline text-xl text-white'/> Search</li></NavLink>
      </div>

      <p className='mr-5 text-end opacity-70'>Category</p>
      <div className='p-2 m-3 mt-1 text-sm text-start bg-zinc-800 rounded'>
        <NavLink to='/tracks'><li className='list-none my-1 text-green-500'><MdAudiotrack className='inline text-xl text-white'/> Song</li></NavLink>
        <NavLink to='/album'><li className='list-none my-1 text-green-500'><MdAlbum className='inline text-xl text-white'/> Albums</li></NavLink>
        <NavLink to='/artist'><li className='list-none my-1 text-green-500'><BsFillMicFill className='inline text-xl text-white'/> Artist</li></NavLink>
        <NavLink to='*'><li className='list-none my-1 text-green-500'><GoFileDirectory className='inline text-xl text-white'/> Local Songs</li></NavLink>
      </div>
      
    </div>
  )
}
