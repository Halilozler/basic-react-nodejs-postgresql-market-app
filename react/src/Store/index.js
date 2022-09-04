import { configureStore } from '@reduxjs/toolkit'
import Site from './Site';

const store = configureStore({
    reducer: {
        Site
    },
})

export default store