import { createSlice, createAsyncThunk, compose } from "@reduxjs/toolkit";
import { account,ID } from "../lib/appwrite";
import { v4 as uuidv4 } from 'uuid';


//? Async thunk for logging in
export const loginUser = createAsyncThunk(
  "user/loginUser", async ({email, password,navigate}) => {
    try {
      
      const res  = await account.createEmailPasswordSession(email,password);
      const user = await account.get();
      const labels = user.labels;
    
       // Check if the user has an 'admin' label
       if (user.labels && user.labels.includes('admin')) {
        // Store the role in localStorage
        localStorage.setItem('role', 'admin');
        navigate('/admin'); // Redirect to admin dashboard
      } else {
        // For non-admin users, store 'user' role
        localStorage.setItem('role', 'user');
        navigate('/'); // Redirect to user homepage
      }
      return res;
    } catch (error) {
      console.log("Login error",error);
    }
  }
);

//? Async thunk for Sing Up

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ email, password} ) => {
    const userId = uuidv4();
    

    const isValidEmail = (email) => {
      // Regular expression for a simple email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };
    try {
      if (!isValidEmail(email)) {
        console.log("Invalid email address UserSlice",email);
        return;
      }
      const response = await account.create(userId ,email ,password);
      return response;
    } catch (error) {
      return console.log(error.message);
    }
  }
);
//? Async thunk for fetching current user

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//? Async thunk for logging out

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await account.deleteSession("current");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle signupUser
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // User is not yet verified; you might choose to keep user data or reset it
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
