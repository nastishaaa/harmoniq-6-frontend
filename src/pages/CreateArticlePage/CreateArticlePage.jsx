import AddArticleForm from "../../components/AddArticleForm/AddArticleForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectIsLoading, selectIsError } from "../../redux/addArticle/addArticleSelectors.js";
// import {addArticle} from '../../redux/addArticles/addArticlesOperations.js';
import css from "./CreateArticlePage.module.css";
import { selectIsLoggedIn } from "../../redux/authorization/selectors.js";
import { useNavigate } from "react-router-dom";

export default function CreateArticlePage() {
  const loading = useSelector(selectIsLoading);
  const error = useSelector(selectIsError);

  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
    
  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); 
  return (
    <div className={css.form}>
      <h1 className={css.createArticle}>Create an article</h1>
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      <AddArticleForm />
    </div>
  );
}
