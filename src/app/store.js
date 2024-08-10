import { configureStore } from '@reduxjs/toolkit'
import blogsSlice from '../slices/blogsSlice'

export const store = configureStore({
    reducer: {
        blogs: blogsSlice,
    },
})