import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apiService";
import { toast } from "react-toastify";
const initialState = {
  books: [],
  favorites: [],
  bookDetail:null,
  status: null,
};
export const getBooks = createAsyncThunk(
  "getBooks",
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url = url + `&q=${query}`;

    const res = await api.get(url);
    return res.data;
  }
);
export const getFavorites = createAsyncThunk("getFavorites", async () => {
  const res = await api.get(`/favorites`);
  return res.data;
});
export const getBookDetail = createAsyncThunk("getBookDetail", async ({bookId}) => {
    const res = await api.get(`/books/${bookId}`);
    return res.data;
  });
  export const addBook= createAsyncThunk("addBook", async ({book}) => {
    const res = await api.post(`/favorites`, book);
    return res.data;
  });
  export const removeBook= createAsyncThunk("removeBook", async (bookId) => {
    const res =  await api.delete(`/favorites/${bookId}`);
    console.log(res.data,"den tu removebook")
    return res.data;
    
  });
  
const booksSlice = createSlice({
  name: "book",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = null;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
      });
    builder
      .addCase(getFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.status = null;
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.status = "failed";
      });
      builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = null;
        state.bookDetail = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = "failed";
      });
      builder
      .addCase(addBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = null;
        state.favorites.push(action.payload);
        toast.success("The book has been added to the reading list!");
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = null;
        toast.error(action.error.message);
      });
      builder
      .addCase(removeBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.status = null;
        toast.success("The book has been removed to the reading list!");
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.status = null;
        toast.error(action.error.message);
      });
  },
});
export default booksSlice.reducer;
