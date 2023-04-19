import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useData } from '../context/fetchDataContext';

export const AlbumTracks = () => {
  const {albumId} =useParams();
  const {token} = useData();
 
  const [track,setTrack] = useState();

  useEffect(()=>{
    if(albumId){
      fetch(`https://api.spotify.com/v1/albums/${albumId}`,{
      headers:{"Authorization": `Bearer ${token}`}
    }).then( res =>{
      if(!res.ok){
        throw new Error(res.status);
      }else{
        return res.json();
      }
    })
    .then((data) =>{
      console.log(data)
      setTrack(data);
    }).catch( error => console.log(error.message));
    }
    else{
      return
    }
  },[])

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className='h-screen overflow-auto w-full'>

      <div className='flex flex-row items-center m-5 max-sm:flex-col '>
        <img src={track?.images[1].url} className='w-40 rounded border mx-10'/>
        <div className='ml-2 p-3'>
          <p className='text-3xl text-green-400 mb-2 max-sm:text-center'>{track?.name}</p>
          <p className='mx-2'>Artist : <span className='text-sm opacity-70'>{track?.artists[0].name}</span></p>
          <p className='mx-2'>Recoard label : <span className='text-sm opacity-70'>{track?.label}</span></p>
          <p className='mx-2'>Date : <span className='text-sm opacity-70'>{track?.release_date}</span></p>
          <p className='mx-2'>Total : <span className='text-sm opacity-70'>{track?.total_tracks} Tracks</span></p>
          <p className='mx-2'>Type : <span className='text-sm opacity-70'>{track?.type}</span></p>
          
        </div>
        
      </div>
      
      <div>

        <div className='flex flex-row justify-between p-3 bg-zinc-800 m-2 mx-12 rounded sticky top-0'>
          <p className='ml-12 text-2xl max-sm:text-sm max-sm:ml-5'>Song Name</p>
          <p className='mr-16 text-2xl max-sm:text-sm max-sm:mr-8'>Duration</p>
        </div>

        <div className='mx-12 p-2 '>
        {track?.tracks?.items.map( song => {
          return(
            <div className='flex flex-row justify-between p-2 bg-green-400 m-2 text-zinc-800 rounded'>
              <p className='ml-10 max-sm:text-sm max-sm:ml-5'>{song?.track_number} . {song?.name} </p>
              <p className='mr-20 max-sm:text-sm max-sm:mr-10'>{millisToMinutesAndSeconds(song?.duration_ms)}</p>
            </div>
          )
        })}
        </div>

      </div>

      <p className='text-center m-2'>{track?.copyrights[0].text}</p>

    </div>
  )
}
