import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  
  return (
   <>
   <footer className="bg-gray-50    ">
  <div className="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
    <div className="max-w-sm">
      <div className="mb-6 flex h-12 items-center space-x-2">
        <span className="text-2xl font-bold">ASMR<span className="text-indigo-600">DEᏉ.</span></span>
      </div>
      <div className="text-gray-500">Simplifying tech with easy tutorials, coding tips, and project ideas for developers of all levels. Learn, build, and grow with practical insights on web development and programming!
</div>
    </div>
    <div className>
      <div className="mt-4 mb-2 font-medium xl:mb-4">Address</div>
      <div className="text-gray-500">

        Ahmedabad, <br />
        Gujarat, India
      </div>
    </div>
    <div className>
      <div className="mt-4 mb-2 font-medium xl:mb-4">Links</div>
      <nav aria-label="Footer Navigation" className="text-gray-500">
        <ul className="space-y-3">
          <li><Link className="hover:text-blue-600 hover:underline" to="/">Home</Link></li>
          <li><Link className="hover:text-blue-600 hover:underline" to="/about-us">About</Link></li>
          <li><Link className="hover:text-blue-600 hover:underline" to="/">Blog</Link></li>
          <li><Link className="hover:text-blue-600 hover:underline" to="/contact-us">Contact</Link></li>
        </ul>
      </nav>
    </div>
    <div className>
      <div className="mt-4 mb-2 font-medium xl:mb-4">Subscribe to our Newsletter</div>
      <div className="flex flex-col">
        <div className="mb-4">
          <input type="email" className="focus:outline mb-2 block h-14 w-full rounded-xl bg-gray-200 px-4 sm:w-80 focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="Enter your email" />
          <button className="block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
  <div className="bg-gray-100">
    <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-4 py-3 text-center text-gray-500 sm:flex-row sm:justify-between sm:text-left">
      <div className>© 2025 ASMRDev | All Rights Reserved</div>
      <div className>
        <a className href="#">Privacy Policy</a>
        <span>|</span>
        <a className href="#">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>


   
   </>
  )
}

export default Footer