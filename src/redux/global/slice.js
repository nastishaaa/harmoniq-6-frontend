import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

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
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.isLoading = true
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false
      })
      .addMatcher(isRejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setLoadingState, setIsModalErrorSaveOpen } = slice.actions

export default slice.reducer
