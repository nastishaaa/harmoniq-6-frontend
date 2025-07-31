import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ArticlesListReusable from "../../components/ArticlesList/ArticlesListReusable";

import {
  fetchAuthorArticles,
  fetchAuthorInfo,
} from "../../redux/authorArticles/authorArticlesOperations";
import {
  selectAuthorArticles,
  selectAuthorArticlesHasMore,
  selectAuthorArticlesLoading,
  selectAuthorArticlesPage,
  selectAuthorInfo,
} from "../../redux/authorArticles/authorArticlesSelectors";

import {
  fetchSavedArticles,
  fetchCreatedArticles,
} from "../../redux/user/userOperations";
import {
  selectSavedArticles,
  selectCreatedArticles,
} from "../../redux/user/userSelectors";

export default function AuthorProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.user.currentUser?._id);
  const isOwnProfile = id === currentUserId;

  const [activeTab, setActiveTab] = useState("my");

  const articles = useSelector(selectAuthorArticles);
  const savedArticles = useSelector(selectSavedArticles);
  const createdArticles = useSelector(selectCreatedArticles);
  const isLoading = useSelector(selectAuthorArticlesLoading);
  const hasMore = useSelector(selectAuthorArticlesHasMore);
  const page = useSelector(selectAuthorArticlesPage);
  const authorInfo = useSelector(selectAuthorInfo);

  // 🔁 Отримуємо загальну інформацію про автора
  useEffect(() => {
    dispatch(fetchAuthorInfo(id));
  }, [id, dispatch]);

  // 📦 Отримуємо відповідні статті
  useEffect(() => {
    if (isOwnProfile) {
      if (activeTab === "my") {
        dispatch(fetchCreatedArticles());
      } else {
        dispatch(fetchSavedArticles());
      }
    } else {
      dispatch(fetchAuthorArticles({ authorId: id, page: 1 }));
    }
  }, [id, dispatch, isOwnProfile, activeTab]);

  const handleLoadMore = () => {
    dispatch(fetchAuthorArticles({ authorId: id, page }));
  };

  return (
    <div>
      {authorInfo && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <img
            src={authorInfo.avatarUrl}
            alt={authorInfo.name}
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <h2 style={{ margin: 0 }}>{authorInfo.name}</h2>
            <p style={{ margin: 0 }}>{authorInfo.articlesAmount} статей</p>
          </div>
        </div>
      )}

      {isOwnProfile && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setActiveTab("my")}
            disabled={activeTab === "my"}
          >
            My Articles
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            disabled={activeTab === "saved"}
          >
            Saved Articles
          </button>
        </div>
      )}

      <ArticlesListReusable
        articles={
          isOwnProfile
            ? activeTab === "my"
              ? createdArticles
              : savedArticles
            : articles
        }
      />

      {!isOwnProfile && hasMore && (
        <button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
