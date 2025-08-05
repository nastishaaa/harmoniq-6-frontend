export const selectUser = (state) => state.authorization.user;
export const selectIsLoggedIn = (state) => state.authorization.isLoggedIn;
export const selectIsRefreshing = (state) => state.authorization.isRefreshing;
export const selectToken = (state) => state.authorization.token;
