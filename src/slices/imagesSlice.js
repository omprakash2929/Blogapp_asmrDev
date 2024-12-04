import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { databases } from "../lib/appwrite";
import {Storage, Client, Databases, Account, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_PROJECT_ID); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);



// Thunk to upload image
export const uploadImage = createAsyncThunk(
  'images/uploadImage',
  async (file, { rejectWithValue }) => {
    // console.log("Imageslice",file)
    try {
      if (!file) {
        throw new Error('No file provided');
      }

      // Create a new file in the specified bucket
      const response = await storage.createFile(process.env.APPWRITE_BUKET_ID, 'unique()', file);
      const fileUrl = await storage.getFileView(process.env.APPWRITE_BUKET_ID, response.$id).toString();
      console.log("fileUrl",fileUrl)
      return {...response,url:fileUrl}; // Return the uploaded file data
    } catch (error) {
      return rejectWithValue(error.message); // In case of error
    }
  }
);

// Not Use but can be used feuture  Thunk to fetch images (example, modify as per your backend)
export const fetchImages = createAsyncThunk(
  'image/fetchImages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await storage.listFiles(process.env.APPWRITE_BUKET_ID);
      const imagesWithUrl = await Promise.all(
        response.files.map(async (file) => {
          const url = await storage.getFileView(process.env.APPWRITE_BUKET_ID, file.$id); // Get the URL for each file
          return { ...file, url }; // Add the URL to the file data
        })
      );

      return imagesWithUrl;
      // console.log(response.files);
      // return response.files; // Return list of files
      
    } catch (error) {
      return rejectWithValue(error.message); // In case of error
    }
  }
);

const imagesSlice = createSlice({

  name: 'images',
  initialState: {
    uploading: false,
    uploadedImage: null,
    error: null,
    uploadStatus: 'idle',
    images: [],
  },
  reducers: {
    resetUploadStatus: (state) => {
      state.uploadStatus = 'idle';
      
    },
  },
  extraReducers: (builder) => {
    builder
//! Image upload
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
        state.uploadStatus = 'uploading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        // state.uploading = false;
        state.uploadStatus = 'done';
        state.uploadedImage = action.payload; // Save uploaded image data
        
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.uploadStatus = 'idle';
        state.error = action.payload;
      })
      // Fetch images actions
      .addCase(fetchImages.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { resetUploadStatus } = imagesSlice.actions;
export default imagesSlice.reducer;
