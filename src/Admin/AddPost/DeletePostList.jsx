import React, { useEffect } from "react";
import { fetchAllPosts, deletePost } from "../../slices/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/Loader";
import { toast } from "react-toastify";

const DeletePostList = () => {
  const dispatch = useDispatch();
  const postsState = useSelector((state) => state.posts);
  const { posts, status, error } = postsState;

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id)).unwrap();
      toast("Delete Post Successful!");
      dispatch(fetchAllPosts());
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-center pb-6">
        <div className="text-center flex justify-center">
          <h2 className="font-semibold text-red-400 text-3xl  text-center">
            Delete Post List
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
                      onClick={() => handleDelete(data.$id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
    
      </div>
    </div>
  );
};


export default DeletePostList;
