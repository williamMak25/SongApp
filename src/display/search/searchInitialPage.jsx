import React from 'react'

export const SearchInitialPage = ({history}) => {
  return (
    <>
    
    {!history.length ? <div className='flex flex-col justify-center items-center p-20'>
                            <img src='https://i.ibb.co/VLxGRmb/ss.png' className='w-96 '/>
                            <p className='text-3xl'>explore more</p>
                        </div>
                        :
                        <div className='flex flex-col justify-center items-start p-5 opacity-70'>
                            <p className='text-3xl'>Search History</p>
                            {history?.map( item =>{
                                return <p className='bg-zinc-700 p-2 m-2 w-full text-xl rounded opacity-70'>{item}</p>
                            })}
                        </div>}
   </>   
  )
}
