import React from 'react'
import { useOutlet } from 'react-router-dom'

export const ArtistAlbumTrack = ({tracks}) => {
    console.log(tracks)
  return (
    <>
    {!Object.values(tracks).length ? 
      <div className='flex flex-col justify-center items-center  p-28'>
        
        <img src='https://i.ibb.co/RbTXD6T/ss.png' className='w-20'/>
        <p>Please Choose Album First</p>
        
      </div> 
    :
    <div>
        <p className='text-green-500 text-xl mt-2 ml-2'>Album Tracks <span className='text-sm text-white'>List</span></p>
        <div className='grid grid-cols-2 gap-1 bg-zinc-700 mt-2 p-2 rounded'>
        
        {tracks?.items?.map( song =>{
            return(
                <div className='bg-zinc-800 text-sm p-2 rounded' key={song?.id}>
                    <p className='text-start truncate'>{song?.track_number}. <span className='text-green-600'>{song?.name}</span></p>
                </div>)})}
        </div>
    </div> }
    
    </>
  )
}
