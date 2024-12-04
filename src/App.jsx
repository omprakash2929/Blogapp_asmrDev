import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Addpost from "./Admin/AddPost/Addpost";
import Viewpost from "./layout/Viewpost";
import AdminLayout from "./Admin/AdminLayout";
import PostOverview from "./Admin/AddPost/PostOverview";
import DeletePostList from "./Admin/AddPost/DeletePostList";

import FrontedPage from "./components/FrontedPage";
import Postpages from "./components/Postpages";
import SearchBlogs from "./components/SearchBlogs";

import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import UpdatePost from "./Admin/AddPost/UpdatePost";
import { ListUpdatePost } from "./Admin/ListUpdatePost";

import ProtectedAdminRoute from "./Admin/Routes/ProtectedAdminRoute";

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<FrontedPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addpost" element={<Addpost />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/viewpost" element={<Viewpost />} />
        <Route path="/search-results" element={<SearchBlogs />} />
        <Route path="/post/:id" element={<Postpages />} />
        <Route path="/image" element={<Viewpost />} />

        {/* Admin Routes */}

        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          {/* Nested Admin Routes */}
          <Route path="addpost" element={<Addpost />} />
          <Route path="postoerview" element={<PostOverview />} />
          <Route path="deletepost" element={<DeletePostList />} />
          <Route path="list-update-post" element={<ListUpdatePost />} />
          <Route path="updatepost/:id" element={<UpdatePost />} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
