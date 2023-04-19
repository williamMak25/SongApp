
import React, { useContext, useEffect, useState } from 'react'

const fetchContext = React.createContext();
export const useData = () =>{
    return useContext(fetchContext)
}
export const DataContext = ({children}) => {

  const [token,setToken] = useState()
  const [artists,setArtists] = useState([]);
  const [albums,setAlbums] = useState([]);
  const [tracks,setTracks] = useState([]);
  const [searchData,setSearchData] = useState([]);
  const [error,setError] = useState(false);
  const [errorStatus,setErrorStatus] = useState();
  const artistId_Array = ["1Xyo4u8uXC1ZmMpatF05PJ",
                          "6eUKZXaKkcviH0Ku9w2n3V",
                          "3mIj9lX2MWuHmhNCA7LSCW",
                          "1uNFoZAHBGtllmzznpCI3s",
                          "66CXWjxzNUsdJxJ2JdwvnR",
                          "41MozSoPIsD1dJM0CLPjZF",
                          "3Nrfpe0tUJi4K4DXYWgMUX",
                          "6HvZYsbFfjnjFrWF950C9d",
                          "2elBjNSdBE2Y3f0j1mjrql",
                          "7tYKF4w9nC0nq9CsPZTHyP"]

//-------------------------accessing the token from spotify to use spotify api------------------------------//

  useEffect(()=>{
    fetch("https://accounts.spotify.com/api/token",{
      method:'POST',
      headers:{"Content-Type":"application/x-www-form-urlencoded"},
      body:"grant_type=client_credentials&client_id=33f132f2d6ee4971804622cd09101992&client_secret=0cf1f0b6cca24e84878a45dd5f3a0637"
    }).then((res)=>{
      if(res.ok){
        setError(false)
        return res.json()
      }else{
        setError(true)
        setErrorStatus(res.status)
        throw new error(res.status)
      } 
    }).then((data)=>{
      console.log(data.access_token)
      setToken(data.access_token)

//------------------------fetching album from spotify-------------------------------------//

  const artist_album = artistId_Array.map( id => fetch(`https://api.spotify.com/v1/artists/${id}/albums`,{
    headers:{"Authorization": `Bearer ${data.access_token}`}})
    .then(res => {
      if(res.ok){
        setError(false)
          return res.json()
      }else{
        setError(true)
        setErrorStatus(res.status)
        throw new error(res.status)} 
    }))
    Promise.all(artist_album)
    .then( data => setAlbums(data))
    .catch( err => console.log(err.message))

//---------------------------------fetching artists from spotify-------------------------------------//

  const ARTIST = artistId_Array.map( artistId => 
    fetch(`https://api.spotify.com/v1/artists/${artistId}`,{
      headers:{"Authorization": `Bearer ${data.access_token}`}
    }).then(res=>{ 
      if(res.ok){
        setError(false)
        return res.json()
      }else{
        setError(true)
        setErrorStatus(res.status)
        throw new error(res.status)
    } 
  }))
  Promise.all(ARTIST)
  .then((data)=>{
    setArtists(data);
  })
  .catch( error => console.log(error.message))
  
}).catch(err => console.log(err.message))
    

//-----------------------------------fetching track from spotify-----------------------------------//

  const artist_tracks = artistId_Array.map( id => fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=us`,{
    headers:{"Authorization": `Bearer ${token}`}
  }).then(res => { 
    if(res.ok){
      setError(false)
      return res.json()
    }else{
      setError(true)
      setErrorStatus(res.status)
    } 
  }))
  Promise.all(artist_tracks)
  .then(data => {
      setTracks(data)
  })
  .catch( err => console.log(err.message))
  

  },[])

//------------------------------------searching-data---------------------------------------------------//

const searchFunction = async (value) => {
  await fetch(`https://api.spotify.com/v1/search?q=${value}&type=track,album,artist&limit=10`,{
     headers:{"Authorization": `Bearer ${token}`}
   }).then( res => {
     if(res.ok){
       setError(false)
       return res.json()
     }else{
       setError(true)
       setErrorStatus(res.status)
     } })
   .then(( data)=> {
     setSearchData(data)
   })
   .catch(err => console.log(err.message))
 }

const value = {
  artists,
  albums,
  error,
  errorStatus,
  tracks,
  token,
  searchFunction,
  searchData
}

  return (
    <fetchContext.Provider value={value}>
        {children}
    </fetchContext.Provider>
  )
}
