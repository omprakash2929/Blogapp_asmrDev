import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../slices/postsSlice"; // Adjust the path to where you define fetchAllPosts

const PostSearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch posts from Redux store
  const postsState = useSelector((state) => state.posts.posts);
  const { posts, status, error } = postsState;

  // Dispatch fetchAllPosts when component mounts
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  // Filter posts based on the search term (title)
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by title
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring focus:ring-blue-400"
        placeholder="Search posts by title..."
      />

      <div className="mt-4 w-full max-w-lg">
        {status === "loading" && <p>Loading posts...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {filteredPosts.length > 0 ? (
          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id} className="p-4 bg-white border rounded shadow mb-2">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-gray-600">{post.content}</p>
                <p className="text-sm text-gray-500 italic">Slug: {post.slug}</p>

                {/* Related Posts Section */}
                <div className="mt-4">
                  <h3 className="text-md font-semibold">Related Posts:</h3>
                  <ul>
                    {posts
                      .filter(
                        (relatedPost) =>
                          relatedPost.slug !== post.slug && // Exclude the current post
                          relatedPost.title.toLowerCase().includes(searchTerm.toLowerCase()) // Optional filter based on the search term
                      )
                      .map((relatedPost) => (
                        <li key={relatedPost.id} className="p-2 border-t">
                          <h4 className="text-sm font-bold">{relatedPost.title}</h4>
                          <p className="text-xs text-gray-500">Slug: {relatedPost.slug}</p>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostSearch;
