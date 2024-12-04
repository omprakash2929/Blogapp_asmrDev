import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";

const BlogPost = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const { posts, status, error } = postsState;

  const postsrev = [...posts].reverse();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <Loader/>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  // console.log(posts);

  return (
    <>
      <section className="container mx-auto py-4 px-4 ">
        <h1 className="mb-12 text-center font-sans text-5xl font-bold">
          Recent Posts
        </h1>
        <div className="mx-auto grid w-auto grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-4 lg:gap-10">
            {
              postsrev.map((postData) => (
                <Link to={`/post/${postData.$id}`}>
                <article  key={postData.$id} className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                  <a href="#" className="block h-full w-full">
                    <img
                      className="max-h-40 w-full object-cover"
                      alt="featured image"
                      src={postData.image}   

                    />
                    <div className="w-full bg-white p-4">
                      <p className="text-md font-medium text-indigo-500">
                       {postData.slug.split(",")}
                      </p> 
                      <p className="mb-2 text-xl font-medium text-gray-800">
                        {postData.title}
                      </p>
                      <p className="text-md font-light text-gray-400">
                        {postData.sortDescription}
                      </p>
                      <div className="justify-starts mt-4 flex flex-wrap items-center">
                        <div className="flex items-center">
                          <img
                            alt="avatar"
                            src="https://images.unsplash.com/photo-1481437642641-2f0ae875f836?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D"
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-800">
                              {postData.author}
                            </p>    
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                 
                  
                </article>
                </Link>
              ))
            }
        
         
        </div>
      </section>
    </>
  );



};

export default BlogPost;
