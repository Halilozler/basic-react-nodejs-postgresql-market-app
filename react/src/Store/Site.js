import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: 0,
    item: [],
}

export const Site = createSlice({
    name: 'Site',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload.items;
        },
        deleteUser: (state, action) => {
            state.user = 0;
        }
    },
})

export const { setUser, setItem, deleteUser } = Site.actions
export default Site.reducer