import { fetchAuthors } from './operations'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'authors',
  initialState: {
    items: [],
    pagination: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        const data = action.payload.data
        const pagination = action.payload.pagination

        state.error = null
        state.pagination = pagination

        if (pagination.page === 1) state.items = data
        else state.items = [...state.items, ...data]
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

export default slice.reducer
