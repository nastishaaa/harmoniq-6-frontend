import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import RootLayout from "./layout/RootLayout";
import { useSelector } from "react-redux";
import { Loader } from "./components/Loader/Loader.jsx";
import { isLoading } from "./redux/global/selectors.js";
import { ModalErrorSave } from "./components/ModalErrorSave/ModalErrorSave.jsx";

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
const CreatorsPage = lazy(() =>
  import("./pages/CreatorsPage/CreatorsPage.jsx")
);
const CreatorDetailPage = lazy(() =>
  import("./pages/CreatorDetailPage/CreatorDetailPage.jsx")
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
      { path: "authors", element: <AuthorsPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "photo", element: <UploadPhotoPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "authors", element: <CreatorsPage /> },
      { path: "authors/:id", element: <CreatorDetailPage /> },
      { path: "create", element: <CreateArticlePage /> },
    ],
  },
]);

function App() {
  const isGlobalLoading = useSelector(isLoading);
  return (
    <>
      {isGlobalLoading && <Loader />}
      <RouterProvider router={router} />
      <ModalErrorSave />
    </>
  );
}

export default App;
