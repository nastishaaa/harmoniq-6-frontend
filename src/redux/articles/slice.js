 import { createSlice } from "@reduxjs/toolkit";
import artiklesExample  from "../../pages/ArticlesPage/articles.json";
 const initialState = {
   items: artiklesExample,
   isLoading: false,
   isError: false,
 };

 const slice = createSlice({
   name: "articles",
   initialState,

   });

 export default slice.reducer;