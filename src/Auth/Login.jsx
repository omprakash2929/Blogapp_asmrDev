import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { loginUser,logoutUser } from '../slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          
           await dispatch(loginUser({email,password,navigate}));
        } catch (error) {
          console.log("login error",error)
        }
        
    }


    const handlelogout = async ()=>{
      await dispatch(logoutUser());
    }
  return (
   <>
   <div className="p-56">
  <div className="flex w-96 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
    <div className="mx-auto mb-2 space-y-3">
      <h1 className=" text-3xl font-bold text-gray-700">Log into ASMRDev</h1>
      <p className="text-gray-500">Login to access your account</p>
    </div>
    <div>
      <div className="relative mt-2 w-full">
        <input type="text" id="email" value={email} onChange={(e)=>setEmail(e.target.value) } defaultValue="email@gmail.com" className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
        <label htmlFor="email" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Email </label>
      </div>
    </div>
    <div>
      <div className="relative mt-2 w-full">
        <input type="text" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0" placeholder=" " />
        <label htmlFor="password" className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"> Enter Your Password</label>
      </div>
    </div>
    <button onClick={handleLogin} className="rounded-lg bg-blue-600 py-3 font-bold text-white">Login</button>
    {/* <button onClick={handlelogout} className="rounded-lg bg-blue-600 py-3 font-bold text-white">Logout</button> */}
    <div className="py-12 text-center">
        <p className="whitespace-nowrap text-gray-600">
        Craete new account?
          <Link to="/signup" className="underline-offset-4 font-semibold text-gray-900 underline">Sing Up Here.</Link>
        </p>
      </div>
  </div>
</div>

   
   </>
  )
}

export default Login