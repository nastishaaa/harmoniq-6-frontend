import AddArticleForm from "../../components/AddArticleForm/AddArticleForm";
import { useSelector } from "react-redux";
//import { useEffect } from "react";
import { selectLoading, selectError } from "../../redux/articles/selectors.js";
//import {addArticle} from '../../redux/addArticles/addArticlesOperations.js';
import css from "./CreateArticlePage.module.css";
import { selectIsLoggedIn } from "../../redux/authorization/selectors.js";

export default function CreateArticlePage() {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={css.form}>
      <h1>Create an article</h1>
      {loading && <p>Loading ...</p>}

      {error && <p>{error}</p>}
      <AddArticleForm />
    </div>
  );
}
