import { configureStore } from '@reduxjs/toolkit';
import booksReducer from "../books/bookSlice"
const store = configureStore({
    reducer: {
       book:booksReducer
    }
})
export default store
