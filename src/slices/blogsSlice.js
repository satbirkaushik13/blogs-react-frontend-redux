import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
};

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.list = action.payload;
        },
        addObject: (state, action) => {
            state.list.push(action.payload);
        },
        removeObject: (state, action) => {
            state.list = state.list.filter(blog => blog.id !== action.payload);
        },
        updateObject: (state, action) => {
            const { id, newData } = action.payload;
            const index = state.list.findIndex(blog => blog.id === id);
            if (index !== -1) {
                state.list[index] = {
                    ...state.list[index],
                    ...newData,
                };
            }
        },
    },
})
export const { setBlogs, addObject, removeObject, updateObject } = blogsSlice.actions;

export default blogsSlice.reducer;