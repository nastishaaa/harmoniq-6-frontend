import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'global',
  initialState: {
    isLoading: false,
    isModalErrorSaveOpen: false,
  },
  reducers: {
    setLoadingState(state, action) {
      state.isLoading = action.payload
    },

    setIsModalErrorSaveOpen(state, action) {
      state.isModalErrorSaveOpen = action.payload
    },
  },
})

export const { setLoadingState, setIsModalErrorSaveOpen } = slice.actions

export default slice.reducer
