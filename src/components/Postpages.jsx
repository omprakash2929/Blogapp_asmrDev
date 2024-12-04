import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchPostBySlug, fetchAllPosts, clearCurrentPost } from "../slices/postsSlice";
import Loader from "../layout/Loader";
import Footer from "../layout/Footer";
import "../App.css"

const Postpages = () => {
  const { id } = useParams(); // Get post ID from URL
  const dispatch = useDispatch();

  const { currentPost, loading, error, posts } = useSelector((state) => state.posts);

  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch the current post and all posts
  useEffect(() => {
    dispatch(fetchPostBySlug(id)); // Fetch the current post by its ID
    dispatch(fetchAllPosts()); // Fetch all posts for related articles
    return () => {
      dispatch(clearCurrentPost()); // Clear current post on component unmount
    };
  }, [id, dispatch]);

  // Filter related posts based on tags, excluding the current post
  const filteredPostsMemo = useMemo(() => {
    if (currentPost && posts.length > 0) {
      const tags = currentPost.slug
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      return posts.filter(
        (post) =>
          post.$id !== currentPost.$id && // Exclude the current post
          tags.some((tag) => post.slug.toLowerCase().includes(tag))
      );
    }
    return [];
  }, [currentPost, posts]);

  console.log("currentPost", typeof currentPost?.post);
  // Update filtered posts when memoized results change
  useEffect(() => {
    setFilteredPosts(filteredPostsMemo);
  }, [filteredPostsMemo]);
  
  
  if (loading) return <Loader />; // Display loader while fetching data

  if (error) return <div className="text-red-500">{error}</div>; // Display error message

  return (
    <>
      <div>
        <main>
          <article>
            <header className="mx-auto max-w-screen-xl pt-28 text-center">
              <p className="text-gray-500">{new Date(currentPost?.$createdAt).toLocaleDateString()}</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-5xl">
                {currentPost?.title}
              </h1>
              <p className="mt-6 text-lg text-gray-700">{currentPost?.sortDescription}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Tags">
                {currentPost?.slug?.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <img
                className="sm:h-[34rem] mt-10 w-full object-contain"
                src={currentPost?.image}
                alt="Featured"
              />
            </header>
            <div className="prose prose-lg max-w-screen-lg mx-auto mt-10 px-6 font-Rubik text-lg tracking-wide text-gray-700 text-justify">
  <div dangerouslySetInnerHTML={{ __html: currentPost?.post }} />
</div>


          </article>
        </main>
        <div className="w-fit mx-auto mt-10 flex space-x-2">
          <div className="h-0.5 w-2 bg-gray-600" />
          <div className="h-0.5 w-32 bg-gray-600" />
          <div className="h-0.5 w-2 bg-gray-600" />
        </div>
        <aside
          aria-label="Related Articles"
          className="mx-auto mt-10 max-w-screen-xl py-20"
        >
          <h2 className="mb-8 text-center text-5xl font-bold text-gray-900">More Blogs</h2>
          <div className="mx-auto grid w-auto grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-4 lg:gap-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((postData) => (
                <Link key={postData.$id} to={`/post/${postData.$id}`}>
                  <article className="h-90 col-span-1 m-auto min-h-full cursor-pointer overflow-hidden rounded-lg pb-2 shadow-lg transition-transform duration-200 hover:translate-y-2">
                    <img
                      className="max-h-40 w-full object-cover"
                      alt="Featured"
                      src={postData.image}
                    />
                    <div className="w-full bg-white p-4">
                      <p className="text-md font-medium text-indigo-500">
                        {postData.slug.split(",").join(", ")}
                      </p>
                      <p className="mb-2 text-xl font-medium text-gray-800">{postData.title}</p>
                      <p className="text-md font-light text-gray-400">
                        {postData.sortDescription}
                      </p>
                      <div className="mt-4 flex items-center">
                        <img
                          alt="Author"
                          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
                          className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-800">
                            {postData.author || "Unknown Author"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <p>No related posts found.</p>
            )}
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Postpages;
