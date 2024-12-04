import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from './../slices/postsSlice';
import Loader from '../layout/Loader';

export const ListUpdatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { posts, loading } = useSelector((state) => state.posts);
    useEffect(() => {
        dispatch(fetchAllPosts());
      }, [dispatch]);
    
      const handleUpdate = (postId) => {
        navigate(`/admin/updatepost/${postId}`);
      };
    
      if (loading) return <Loader/>;
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-center pb-6">
        <div className="text-center flex justify-center">
          <h2 className="font-semibold text-red-400 text-3xl  text-center">
            Update Post List
          </h2>
        </div>
      </div>
      <div className="overflow-y-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Title </th>
                <th className="px-5 py-3">author</th>
                <th className="px-5 py-3">Created at</th>
                <th className="px-5 py-3">delete</th>
              </tr>
            </thead>

            {posts.map((data) => (
              <tbody key={data.$id} className="text-gray-500">
                <tr>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">{data.$id} </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="whitespace-no-wrap">{data.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap"> {data.author} </p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <p className="whitespace-no-wrap">Sep 28, 2022</p>
                  </td>
                  <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                    <span
                      className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white cursor-pointer"
                      onClick={() => handleUpdate(data.$id)}
                    >
                      Update
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        
      </div>
    </div>
  )
}
