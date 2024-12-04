import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../slices/postsSlice";
import { useLocation, Link } from "react-router-dom";
import Footer from "../layout/Footer";

const SearchBlogs = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const { posts, status, error } = postsState;
  const { search } = useLocation(); // Get the query string from the URL
  const searchParams = new URLSearchParams(search);

  const [filteredPosts, setFilteredPosts] = useState([]);
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [status, dispatch]);

  
  // Filter posts based on search term
  useEffect(() => {
    if (query) {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.slug.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [query, posts]);

  console.log("filteredPosts", filteredPosts);
  return (
    <>
     <section className="container mx-auto py-4 px-4 ">
        <h1 className="mb-12 text-center font-sans text-5xl font-bold">
          Search Results 
        </h1>
        <div className="mx-auto grid w-auto grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-4 lg:gap-10">
            {
              filteredPosts.map((postData) => (
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
                            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
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
    
    
    <Footer/>
    </>
  );
};

export default SearchBlogs;
