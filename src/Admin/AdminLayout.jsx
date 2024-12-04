import React from 'react'
import SideBar from './layout/SideBar'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const AdminLayout = () => {
  return (
    <div className='flex '>
       <ToastContainer />
      <SideBar />

    <div className="w-full" >
      <Outlet />
    </div>
  </div>
  )
}

export default AdminLayout