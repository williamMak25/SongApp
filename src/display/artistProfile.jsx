import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useData } from '../context/fetchDataContext'
import { ArtistAlbumTrack } from './artistAlbumTrack'

export const ArtistProfile = () => {
   const {id} = useParams()
   const {artists,tracks,token} = useData()
   const [artistAlbum,setArtistAlbum] = useState([]);
   const [artistSongs,setArtistSongs] = useState([]);
   const [albumTracks,setAlbumTracks] = useState([])
   const artistDetail = artists.find( artist => artist.id === id)

   function shuffle(array) {
    for (let i = array?.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
   
  useEffect(()=>{

  fetch(`https://api.spotify.com/v1/artists/${id}/albums`,{
    headers:{"Authorization": `Bearer ${token}`}
  }).then((res)=>{
    return res.json()
  }).then((data)=>{
   setArtistAlbum(data)
  }).catch( err => console.log(err))


  fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=us`,{
    headers:{"Authorization": `Bearer ${token}`}
  }).then( res =>{ return res.json()})
  .then((data) =>{
    setArtistSongs(data.tracks)
  }).catch( err => console.log(err))
   },[])
  
  const handleClick = async (id) => {
   await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`,{
      headers:{"Authorization": `Bearer ${token}`}
    }).then( res =>{
      if(!res.ok){
        throw new Error(res.status)
      }else{
        return res.json()
      }
    })
    .then((data) =>{
      setAlbumTracks(data)
    }).catch( error => console.log(error.message))
  }
  
  return (
    
  <div style={{backgroundImage:`url(${artistDetail?.images[0].url})`,
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat',
                backgroundSize:'cover'}} className='backdrop-blur-lg h-screen w-full overflow-auto'>
    <div className='h-2/5'>
        <h1 className='text-6xl font-bold mt-5 ml-5 text-green-400'>{artistDetail?.name}</h1>
        <p className='mt-2 ml-10 text-green-400'>{artistDetail?.followers.total}  Followers</p>  
    </div>

    <img src={artistDetail?.images[2].url} className='rounded-full mt-[-150px] mb-[-80px] ml-10 border-4 border-zinc-800'/>

{/*--------------------------------------Wrapper for song all section-------------------------------------------------------------------- */}

    <div className='w-full p-5 pt-20 bg-zinc-800 flex justify-between max-sm:flex-col'>

{/*--------------------------------------------Artist Songs--------------------------------- */}

        <div className='w-1/2 bg-zinc-700 p-2 rounded-xl mt-3 h-full max-sm:w-full'>
          <p className='text-3xl mx-3 text-green-500'>Popular Top <span className='text-sm text-white'>Songs</span></p>
          <hr className='my-2 mx-2'/>
            {artistSongs ? artistSongs?.map( ite => {
            return(
            <div key={ite?.id} className='flex flex-row items-center px-5 py-2 m-2 bg-zinc-900 rounded hover:bg-zinc-800' >
              <img src={ite?.album.images[2].url} className='w-10 mr-5'/>
              <p className='text-sm text-green-500 '>{ite?.name}</p>  
            </div>)}) 
            : <div>Loading</div>}
        </div>
{/*---------------------------------------------Artist Albums section---------------------------------- */}

      <div className='p-3  bg-zinc-00 w-1/2 max-sm:w-full'>
        <p className='text-start text-3xl bg-zinc-700 text-green-400 mr-5 p-2 w-full rounded-lg'>Popular <span className='text-white text-sm'>Album</span></p>
        <hr className='my-2 mx-2'/>
        <div className='grid grid-cols-5 gap-3 bg-zinc-700 mt-2 p-3 rounded-xl'>
        {artistAlbum ? artistAlbum?.items?.slice(5,15).map(album => {
          return(
            <NavLink to={`/artist/${id}/${album?.id}`}><div key={album?.id} className='text-center ' onClick={()=>handleClick(album?.id)}>
              <img src={album?.images[1].url} className=' mx-auto mb-2 w-20 rounded-xl border-2 border-green-400 hover:opacity-60'/>
              <p className='text-xs'>{album?.name}</p>
              <p className='text-xs'>{parseInt(album?.release_date.split('-')[0])} . <span>{album?.album_type}</span></p>
            </div></NavLink>)})
          :<div>loading</div>}

{/*-------------------------------------------Ablum tracks section-------------------------------- */}

        </div>
          <ArtistAlbumTrack tracks={albumTracks}/>
        </div>

  </div>

</div>
  )
}
