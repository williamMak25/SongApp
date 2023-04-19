import React, { useEffect, useState } from 'react'
import { useData } from '../context/fetchDataContext';
import { NavLink } from 'react-router-dom';
import {FaAngleDoubleLeft } from "react-icons/fa";

export const AlbumPage = () => {
    const {albums} = useData();
    const [gg,setgg] = useState('');
    console.log(gg)
    //-------Randoming the aritist and album
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    const handleChange = (name) => {
        setgg(name)
        console.log(gg)
    }

  return (
    <div className='h-screen w-full overflow-auto'>
        
        <div className='mx-20 mt-3 flex flex-row items-center justify-between max-sm:mx-5 max-md:justify-start '>
            <NavLink to='/'><FaAngleDoubleLeft className='text-green-400 text-xl'/></NavLink>
            <p className='text-2xl text-green-500 max-md:mx-5'>Popular Album</p>
        </div>
        <hr className='border-green-600 mx-7 mt-5 max-sm:mx-1'/> 
        <div className='grid grid-cols-5 text-green-500 m-3 rounded-xl p-3 max-sm:m-1 max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4'>
            {shuffle(albums)?.map( items => {
                return  shuffle(items.items)?.slice(3,5).map( album =>{
                    
                    return(
                        <NavLink to={`/album/${album?.id}`}>
                        <div className='flex flex-col p-3 w-52 h-64 m-2 justify-between bg-zinc-900 rounded rounded-3xl max-sm:w-44 ' key={album?.id}>
                            <img src={album.images[1].url} className='rounded-xl h-52 max-sm:h-40 '/>
                            <p className='text-center mt-2 text-sm truncate' onClick={() => handleChange(album?.name)}>{album?.name}</p> 
                        </div>
                        </NavLink>
                    )
                })
            })}
        </div>
    </div>
  )
}
