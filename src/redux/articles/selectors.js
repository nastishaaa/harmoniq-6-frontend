export const selectArticles = (state) => state.articles.items;
export const selectLoadingArticles = (state) =>
  state.articles.isLoadingArticles;
export const selectErrorArticles = (state) => state.articles.isErrorArticles;

export const selectSelectedArticle = (state) => state.articles.selectedArticle;
export const selectLoadingArticle = (state) => state.articles.isLoadingArticle;
export const selectErrorArticle = (state) => state.articles.isErrorArticle;
