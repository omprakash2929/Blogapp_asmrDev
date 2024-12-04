import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Client, Account } from "appwrite";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from "../AdminLayout";
const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null); // null for loading state
  const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject("65d89a78acd2adfcfef9");
  const account = new Account(client);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await account.get();
        // Assume the role is stored in user.prefs.role or another field
        const labels = user.labels;
        if (labels.includes('admin')) {
            // Redirect to admin page
           console.log("admin")
          }
        setIsAdmin(user.labels === "admin");
      } catch (error) {
        console.error("Error fetching account:", error);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  if (isAdmin === null) return <div>Loading...</div>; // Show a loader while verifying role

  return isAdmin ? <AdminLayout /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
