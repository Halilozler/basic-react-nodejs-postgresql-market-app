import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    item: []
}

export const Site = createSlice({
    name: 'Site',
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.item = action.payload;
        }
    },
})

export const { setTheme, setLanguage } = Site.actions
export default Site.reducer