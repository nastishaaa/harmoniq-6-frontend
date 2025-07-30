import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ArticlesListReusable from "../../components/ArticlesList/ArticlesListReusable";

import { fetchAuthorArticles } from "../../redux/authorArticles/authorArticlesOperations";
import {
  selectAuthorArticles,
  selectAuthorArticlesHasMore,
  selectAuthorArticlesLoading,
  selectAuthorArticlesPage,
} from "../../redux/authorArticles/authorArticlesSelectors";

export default function AuthorProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.user.currentUser?._id);
  const isOwnProfile = id === currentUserId;

  const articles = useSelector(selectAuthorArticles);
  const isLoading = useSelector(selectAuthorArticlesLoading);
  const hasMore = useSelector(selectAuthorArticlesHasMore);
  const page = useSelector(selectAuthorArticlesPage);

  // ⬇️ Запускаємо завантаження статей при першому рендері або при зміні автора
  useEffect(() => {
    dispatch(fetchAuthorArticles({ authorId: id, page: 1 }));
  }, [id, dispatch]);

  // ➕ Обробник кнопки "Load More"
  const handleLoadMore = () => {
    dispatch(fetchAuthorArticles({ authorId: id, page }));
  };

  return (
    <div>
      <h2>Author Profile Page</h2>
      <p>Author ID: {id}</p>
      <p>{isOwnProfile ? "Це твій профіль" : "Це інший автор"}</p>

      <ArticlesListReusable articles={articles} />

      {hasMore && (
        <button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
