import { createSelector } from '@reduxjs/toolkit'

export const selectItems = (state) => state.authors.items
export const selectPagination = (state) => state.authors.pagination

export const authors = createSelector([selectItems, selectPagination], (data, pagination) => ({
  data,
  pagination,
}))
