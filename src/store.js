import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import postsReducer from './slices/postsSlice';
import imageReducer from './slices/imagesSlice';
 const store =configureStore({
    reducer:{
        user:userReducer,
        posts: postsReducer,
        images: imageReducer,
    }
})

export default store;