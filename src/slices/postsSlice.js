import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {Storage, Client, Databases, Account, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65d89a78acd2adfcfef9"); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
// Async thunk for fetching all posts

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await databases.listDocuments(
        "blogs",
        process.env.APPWRITE_POSTS_COLLECTION_ID,
        []
      );
      return response.documents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a new post

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (postData, { rejectWithValue }) => {
    console.log(postData);
    try {
      const response = await databases.createDocument(
        "blogs",
        process.env.APPWRITE_POSTS_COLLECTION_ID,
        ID.unique(),
        postData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (documentId, { rejectWithValue }) => {
    try {
      const response = await databases.deleteDocument(
        "blogs",
        process.env.APPWRITE_POSTS_COLLECTION_ID,
        documentId
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ( {id, updatedPost} ) => {
    console.log("UpdatingDataBack:", updatedPost);
    try {
      if (!id) throw new Error("Document ID is missing."); // Validate the document ID
      console.log("Updating post:", id, updatedPost);
      
      // Ensure you're passing valid parameters
      const response = await databases.updateDocument(
        "blogs",                // Database ID
        process.env.APPWRITE_POSTS_COLLECTION_ID, // Collection ID
        id,                     // Document ID
        updatedPost,             // Data to update             
      );

      return response; // Return the updated post document
    } catch (error) {
      console.error("Error updating post:", error.message);
     
    }
  }
);

// Thunk to fetch post data by slug
// Async Thunk: Fetch Post by Slug
export const fetchPostBySlug = createAsyncThunk(
  'posts/fetchPostBySlug',
  async (id, { rejectWithValue }) => {
    try {
      // Fetching the post from Appwrite database
      console.log("id",id);
      const response = await databases.getDocument('blogs', '65d89cc4eda86c821d65', id);
      console.log("response",response);
      return response; // Return the response as the payload
    } catch (error) {
      console.error('Error fetching post:', error);
      return rejectWithValue(error.message || 'Failed to fetch post');
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setPost: (state, action) => {
      state.currentPost = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearCurrentPost(state) {
      state.currentPost = null; // Clear the current post
      state.error = null; // Clear any error message
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchPosts
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle createNewPost
      .addCase(createNewPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload); // Add new post to the beginning
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //Handle deletePost
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove the deleted post from the state by filtering it out
        state.posts = state.posts.filter((post) => post.$id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

        // Update a post
        .addCase(updatePost.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updatePost.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const index = state.posts.findIndex(post => post.$id === action.payload.$id);
          if (index !== -1) {
            state.posts[index] = action.payload; // Update the post in the state
          }
        })
        .addCase(updatePost.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchPostBySlug.pending, (state) => {
          state.loading = true;
          state.error = null; // Clear previous errors
        })
        // Fulfilled: Successfully fetched post
        .addCase(fetchPostBySlug.fulfilled, (state, action) => {
          state.loading = false;
          state.currentPost = action.payload; // Set the current post data
        })
        // Rejected: Error while fetching post
        .addCase(fetchPostBySlug.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch post'; // Set the error message
        });

  },
});
export const { setLoading, setPost, setError } = postsSlice.actions;

export const { clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;
