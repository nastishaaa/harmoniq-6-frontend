import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, useEffect } from "react";
import RootLayout from "./layout/RootLayout";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "./components/Loader/Loader.jsx";
import { isLoading } from "./redux/global/selectors.js";
import { ModalErrorSave } from "./components/ModalErrorSave/ModalErrorSave.jsx";

import { selectIsRefreshing } from "./redux/authorization/selectors.js";
import { refresh } from "./redux/authorization/operations.js";
import { store } from "./redux/store.js";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const ArticlesPage = lazy(() =>
  import("./pages/ArticlesPage/ArticlesPage.jsx")
);
const ArticleDetailPage = lazy(() =>
  import("./pages/ArticleDetailPage/ArticleDetailPage.jsx")
);
const AuthorsPage = lazy(() => import("./pages/AuthorsPage/AuthorsPage.jsx"));
const RegisterPage = lazy(() =>
  import("./pages/RegisterPage/RegisterPage.jsx")
);
const UploadPhotoPage = lazy(() =>
  import("./pages/UploadPhotoPage/UploadPhotoPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const AuthorProfilePage = lazy(() =>
  import("./pages/AuthorProfilePage/AuthorProfilePage.jsx")
);
const CreateArticlePage = lazy(() =>
  import("./pages/CreateArticlePage/CreateArticlePage.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "articles", element: <ArticlesPage /> },
      { path: "articles/:id", element: <ArticleDetailPage /> },
      { path: "users", element: <AuthorsPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "photo", element: <UploadPhotoPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "users/:id", element: <AuthorProfilePage /> },
      { path: "create", element: <CreateArticlePage /> },
    ],
  },
]);

function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const isGlobalLoading = useSelector(isLoading);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(refresh());
  // }, []);

  
  useEffect(() => {
    const token = store.getState().authorization.token;
  if (token) {
    dispatch(refresh());
  }
  }, []);
  return (
    <>
      
      {isGlobalLoading && <Loader /> || isRefreshing && <Loader />}
      <RouterProvider router={router}>
        <ModalErrorSave />
      </RouterProvider>
    </>
  );
}

export default App;
