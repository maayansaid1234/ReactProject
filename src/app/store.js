import { configureStore } from '@reduxjs/toolkit'
import courseSlice from "../features/course/courseSlice";
export const store = configureStore({
    reducer: {
        
        course: courseSlice
    }
})