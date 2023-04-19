import React, { useEffect, useState } from 'react'
import { useData } from '../../context/fetchDataContext'
import { SearchInitialPage } from './searchInitialPage'
import {HiOutlineSearchCircle} from 'react-icons/hi'

export const SearchPage = () => {
  const {searchFunction,searchData} = useData();
  const [searchValue,setSearchValue] = useState();
  const encodedQ = encodeURI(searchValue);

  const history =JSON.parse(localStorage.getItem('searchHistory'));
console.log(history)

  const handleClick = () =>{

    searchFunction(encodedQ);
    console.log('success')

    /*Search History */
    let searchHistory = localStorage.getItem('searchHistory');  
    if (!searchHistory) {
      searchHistory = [];
    } else {
      searchHistory = JSON.parse(searchHistory);
    }
    searchHistory.push(searchValue);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    
  }
 
  

  return (
    <div className='w-full p-4 h-screen overflow-auto'>
        <div className='sticky top-1 mx-5 bg-zinc-900 p-3 rounded'>
          <p className='text-4xl mb-3 text-green-400'>Songify</p>
            <input type='text' value={searchValue} className=' border border-3 border-green-300 bg-zinc-800 rounded outline-none text-white px-4 my-0' onChange={e => setSearchValue(e.target.value)} />
            <button className='mx-2 bg-green-600 px-2 rounded' onClick={handleClick}>Search</button>
        </div>
        {(!searchValue && !searchData?.length )  ? <SearchInitialPage history={history}/> 
        :
        <>
        {/*all search-results */}
        <div className='p-5'>
          {/*ablum search-results */}
          <div className='bg-zinc-900 p-4'> 
            <div className='grid grid-cols-2'>
              <p className='text-3xl text-green-400 mb-3'>Album</p>
              {searchData?.albums?.items?.map(items => {
               return(
                  <div>
                    <li className='underline'>{items?.name}</li>
                    <p className='opacity-40 mx-5'>{items?.release_date.split('-')[0]}</p>
                  </div>)})}
            </div>
          </div>
          
          <div className='grid grid-cols-2 gap-3 mt-5 '>

                      {/*artist search-results */}
            <div className='bg-zinc-900 p-4'>
              
              <div className=' p-2 rounded-xl'>
                <p className='text-3xl text-green-400 '>Artists</p>
                {searchData?.artists?.items?.map(items => {
                return(
                  <div className='flex flex-row m-5'>
                    <img src={items?.images[2]?.url} className='w-10 h-10 mr-5'/>
                    <div>
                      <p className='underline'>{items?.name}</p>
                      <p className='opacity-40 test-sm'>{items?.followers.total} followers</p>
                    </div> 
                  </div>)})}
              </div>
            </div>

                      {/*track search-results */}
            <div className='bg-zinc-900 p-4'>
              
              <div className=' p-2 rounded-xl'>
                  <p className='text-3xl text-green-400'>Songs</p>
                  {searchData?.tracks?.items?.map(items => {
                   return(
                    <div className='flex flex-row m-5'>
                      <div>
                        <p className='underline'>{items?.name} {items?.popularity}</p>
                        <p className='opacity-40 test-sm'>{items?.artists[0]?.name} </p>
                      </div> 
                    </div>)})}
              </div>
            </div>

          </div>

        </div></>}
    </div>
  )

}
