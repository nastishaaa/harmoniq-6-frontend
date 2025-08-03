// export const selectAuthorArticles = (state) => state.authorArticles.items;
export const selectAuthorArticles = (state) =>
  state.authorArticles?.items || [];

export const selectAuthorArticlesLoading = (state) =>
  state.authorArticles.isLoading;
export const selectAuthorArticlesError = (state) => state.authorArticles.error;
export const selectAuthorArticlesPage = (state) => state.authorArticles.page;
export const selectAuthorArticlesHasMore = (state) =>
  state.authorArticles.hasMore;
