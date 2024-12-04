import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate();

  return (
<>
<header className="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 lg:flex-row lg:items-center ">
  <a href="#" className="flex items-center whitespace-nowrap text-gray-900 text-2xl font-black">
    <span className="mr-2 w-8">
      {/* <img src="../assets/logo/asmr.jpg"  /> */}
    </span>
    ASMR<span className="text-indigo-600">DEᏉ.</span>
  </a>
  <input type="checkbox" className="peer hidden" id="navbar-open" />
  <label className="absolute top-5 right-5 cursor-pointer lg:hidden" htmlFor="navbar-open">
    <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </label>
  <nav aria-label="Header Navigation" className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row">
    <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
      <li className="lg:mr-12"><Link className="rounded text-gray-600 transition focus:outline-none  focus:text-gray-900 focus:ring-offset-2 font-semibold" to="/">Home</Link></li>
      <li className="lg:mr-12"><Link className="rounded text-gray-600 transition focus:outline-none  focus:text-gray-900 focus:ring-offset-2 font-semibold" to="/about-us">About</Link></li>
      <li className="lg:mr-12"><Link className="rounded text-gray-600 transition focus:outline-none  focus:text-gray-900 focus:ring-offset-2 font-semibold" to="/">Blog</Link></li>

      <li className="lg:mr-12"><button className="rounded text-gray-600 transition focus:outline-none  focus:text-gray-900 focus:ring-offset-2 font-semibold" onClick={() => navigate("/search-results?query=trending")}>Trending Topic</button></li>
      <li className="lg:mr-12"><Link className="rounded text-gray-600 transition focus:outline-none  focus:text-gray-900 focus:ring-offset-2 font-semibold" to="/contact-us">Contact Us</Link></li>
    </ul>
    <hr className="mt-4 w-full lg:hidden" />
    <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
      
      <Link to="/signup" title className="whitespace-nowrap rounded-md bg-gray-900 px-9 py-3 font-medium text-white transition-all duration-200 focus:outline-none  hover:bg-gray-400 hover:text-gray-950">Subscribe</Link>
    </div>
  </nav>
</header>
<hr className='bg-gray-800 h-[1.4px]' />
</>
  



  )
}

export default NavBar