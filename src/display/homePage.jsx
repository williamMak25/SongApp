import React, { useEffect, useState } from 'react'
import { useData } from '../context/fetchDataContext'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import {BsDisc} from  'react-icons/bs';
import '../App.css'

export const HomePage = () => {
  const {artists,albums,tracks} = useData();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let width;
  if(windowWidth < 769){
    width = 2
  }else if(windowWidth > 769){
    width = 4
  }
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  },[]);
  
  console.log(width)

    function shuffle(array) {
      for (let i = array?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

  return (
    <div className='overflow-auto h-screen w-full'>

      {/*song tracks*/}
        <div className='p-3'>

            <div className='flex flex-row items-center justify-between mx-5'> 
              <p className='text-4xl m-3 ml-2 text-green-400'>Popular Songs</p> 
            </div>

            <div className='grid grid-cols-4 grid-rows-2 gap-2 p-2  hover:backdrop-blur-sm '>

                {shuffle(tracks[1]?.tracks)?.slice(0,1).map( song => {
                  console.log(song)
                  return(
                    <div className='col-start-1 col-span-2 row-span-2 rounded-2xl bg-zinc-800 p-3 max-md:flex max-md:flex-col max-md:justify-center'>
                      <img src={song?.album?.images[0].url} className='rounded-xl '/>
                      <p className='text-green-100 text-xl p-2 mt-5 text-green-400 max-md:text-sm'>{song?.name}</p>
                      <p className='text-green-100 text-sm p-2 max-md:text-sm'>Album - <span className='text-green-500 '>{song?.album.name}/100</span> </p>
                      <div className='md:hidden'>
                        <p className='m-3 max-md:text-xs'>Popularity - <span className='text-green-500 '>{song?.popularity}/100</span> </p>
                        <p className='m-3 max-md:text-xs'>Type - <span className='text-green-500 '>{song?.type}</span> </p> 
                      </div>
                    </div>)})}
                  
                  <div className='col-span-1 row-span-1 text-center bg-zinc-800 p-3 rounded-2xl col-start-3 max-sm:col-span-2'>
                    <img src={tracks[5]?.tracks[8]?.album.images[1].url} className='rounded-xl max-[980px]:w-40'/>
                    <p className='m-2 text-green-400 max-[420px]:hidden'>{tracks[5]?.tracks[8]?.name}</p>
                    <p className='text-xs mx-2 opacity-70 max-[420px]:hidden'>( Album - {tracks[5]?.tracks[8]?.album.name} )</p>
                  </div> 

                  <div className='col-start-4 col-span-1 row-span-1 grid grid-cols-2 gap-1 bg-zinc-800 p-2 rounded-2xl max-sm:hidden max-md:grid-cols-1 max-md:grid'>
                    {shuffle(tracks[2]?.tracks)?.slice(0,width)?.map( items =>{
                      return(
                        <div>
                          <img src={items?.album.images[2].url} className='w-full index-20 rounded-2xl transform transition-all hover:scale-125 hover:origin-right hover:shadow-lg max-[980px]:w-20 max-[420]:rounded'/>
                          <p className='text-center mt-2 text-green-400 text-xs max-sm:hidden'>{items?.name}</p>
                        </div>)
                    })} 
                  </div> 

                  <div className='row-span-1 col-start-3 col-end-5 col-span-2 flex flex-row bg-zinc-800 items-center pl-5 rounded-3xl max-md:px-2 max-md:block'>
                    {shuffle(tracks[2]?.tracks)?.slice(0,1).map(song => {
                      return(
                      <>
                      <img src={song?.album?.images[1].url} className='my-3 rounded-3xl animate-pulse max-sm:w-fit max-xl:mx-auto '/>
                      <p className='m-3 text-xl text-green-400 max-sm:text-xs max-md:text-center md:hidden'>{song?.name}</p>
                      <div className='ml-2 '>
                        <p className='m-3 text-xl text-green-400 max-sm:text-xs max-md:text-center max-xl:hidden'>{song?.name}</p>
                        <p className='m-3 text-sm max-xl:hidden'>Popularity - <span className='text-green-500 '>{song?.popularity}/100</span> </p>
                        <p className='m-3 text-sm max-xl:hidden'>Type - <span className='text-green-500 '>{song?.type}</span> </p>
                        <p className='m-3 text-sm max-xl:hidden'>Artist - <span className='text-green-500'> {song?.name}</span></p>
                        <p className='m-3 text-sm max-xl:hidden'>Album - <span className='text-green-500 '>{song?.album.name}</span> </p>
                      </div>
                      </>
                      )})}
                    

                  </div> 
            </div>
        </div>

      {/*artist*/}
       <div className=' p-3 bg-zinc-900 m-5 rounded rounded-xl overflow-hidden'>
          <div className='flex flex-row items-center justify-between mx-5 max-sm:'>
            <NavLink to='/artist'><p className='underline m-3 text-green-400'>See more</p></NavLink>
            <p className='text-3xl m-3 text-green-400 max-sm:text-sm'>Popular Artist</p>
          </div>
          <hr className='border-green-600 mx-7'/>
          <div className=' flex flex-row justify-around pl-28 py-5 w-full h-82 overflow-x-auto overflow-y-hidden scrollBar_style'>
              {artists?.slice(0,7).map( artist => {
                return(
                  <div className='bg-zinc-800 w-52 mx-5 rounded p-2 hover:border border-green-400' key={artist?.id}>
                    <NavLink to={`/artist/${artist?.id}`} className='w-52'>
                      <img src={artist?.images[2].url} className='mx-auto mt-2 rounded- w-52'/>
                      <p className='mt-3 text-xl w-48 text-center'>{artist?.name}</p>
                      <p className='opacity-70 w-48 text-center'>{artist?.type}</p>
                    </NavLink>
                  </div>)})}
          </div>
        </div>

        {/*album*/}
          <div className='p-3  m-5 rounded rounded-xl'>

          <div className='flex flex-row items-center justify-between mx-5 max-sm:'>
            <p className='text-3xl m-3 text-green-400 max-sm:text-sm'>Popular Album</p>
            <NavLink to='/album'><p className='underline m-3 text-green-400'>See more</p></NavLink>
          </div>
          <hr className='border-green-600 mx-7'/>

            <div className=' flex flex-row bg-zinc-900 justify-around p-5 my-5 w-full rounded-xl max-sm:grid max-sm:grid-cols-2 max-sm:p-2'>
            {albums?.slice(2,6).map( album => {
              return album?.items?.slice(0,1).map( items => {
                return(
                  <div className='mx-4  rounded p-3 text-center max-sm:w-full max-sm:mx-0 ' key={items.id}>
                    
                    <NavLink to='/'>
                      <img src={items?.images[1]?.url} className='mx-auto mt-2 rounded-xl '/>
                      <p className='ml-2 mt-3 text-md hover:text-zinc-600 max-sm:text-xs'>{items?.name}</p>
                      <p className='ml-3 opacity-70 max-sm:text-xs'>{items?.release_date.split('-')[0]} . <span>{items?.type}</span></p>
                    </NavLink>
                  </div>)})})}
            </div>
          </div>
      </div>
  )
}
