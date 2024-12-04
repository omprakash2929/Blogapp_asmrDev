import React from 'react'

const Hero = () => {
  return (
    <>
    <div className='container relative mx-auto  overflow-hidden px-4 py-4 lg:flex-row lg:items-center '>
    
     <img className=" invisible sm:visible mx-auto mt-16 mb-20 w-full rounded-xl object-cover object-center shadow-lg shadow-indigo-100" src="https://cdn.pixabay.com/photo/2017/07/31/11/44/laptop-2557571_1280.jpg" alt="" />
    <div className="mx-auto w-[90%]  rounded-xl sm:rounded-md  bg-gray-900 p-8 text-white md:flex md:flex-col  lg:flex-row md:items-center  md:justify-around  lg:p-16 lg:rounded-xl relative mt-[-23rem] sm:mt-[-17rem]  ">
  <div className="sm:mr-10 sm:mb-10 md:mb-0">
    <h2 className="mb-8 max-w-5xl text-center text-[17px] lg:text-3xl md:text-center md:text-[30px] font-bold sm:text-4xl">Daliy Tech News and Learn new features and Technology</h2>
    <ul className="flex max-w-xl flex-wrap md:justify-center lg:justify-normal gap-4">
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-100">A new feature for you</p>
      </li>
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-100">Tech News</p>
      </li>
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-100">Jobs Hiring</p>
      </li>
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-100">Learn New Technology </p>
      </li>
      <li className="flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-green-300">
          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
        </svg>
        <p className="text-gray-100">Further Enhancements Blog</p>
      </li>
    </ul>
  </div>
  <div className="whitespace-nowrap mt-10 md:mt-10 flex justify-center sm:justify-normal ">
    <button className="focus:outline-4 rounded-xl bg-emerald-400 px-4 py-3 font-medium text-white shadow-md outline-white transition hover:bg-emerald-500">Read now</button>
  </div>
</div>

  
  
  
    </div>
    </>
  )
}

export default Hero