import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AuthorProfilePage.module.css";
import AlertIcon from "../../public/icons/alert.svg";
import ArticlesListReusable from "../../components/ArticlesList/ArticlesListReusable";
import { resetAuthorArticles } from "../../redux/authorArticles/authorArticlesSlice";
import { fetchAuthorArticles } from "../../redux/authorArticles/authorArticlesOperations";
import {
  selectAuthorArticles,
  selectAuthorArticlesHasMore,
  selectAuthorArticlesLoading,
  selectAuthorArticlesPage,
} from "../../redux/authorArticles/authorArticlesSelectors";

import {
  fetchSavedArticles,
  fetchCreatedArticles,
} from "../../redux/user/userOperations";

import {
  selectSavedArticles,
  selectCreatedArticles,
  selectUser as selectCurrentUser,
} from "../../redux/user/userSelectors";

import { selectUser as selectAuthUser } from "../../redux/authorization/selectors";
import { setCurrentUser } from "../../redux/user/userSlice";

export default function AuthorProfilePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const authUser = useSelector(selectAuthUser);
  const currentUser = useSelector(selectCurrentUser);

  const [activeTab, setActiveTab] = useState("my");
  const [authorInfo, setAuthorInfo] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const articles = useSelector(selectAuthorArticles);
  const savedArticles = useSelector(selectSavedArticles);
  const createdArticles = useSelector(selectCreatedArticles);
  const isLoading = useSelector(selectAuthorArticlesLoading);
  const hasMore = useSelector(selectAuthorArticlesHasMore);
  const page = useSelector(selectAuthorArticlesPage);

  const isOwnProfile = String(currentUser?._id) === String(id);

  const newItemRef = useRef(null);
  const prevDataLength = useRef(0);

  useEffect(() => {
    if (!currentUser && authUser?._id) {
      dispatch(setCurrentUser(authUser));
    }
  }, [authUser, currentUser, dispatch]);

  useEffect(() => {
    if (!isOwnProfile) {
      const fetchAuthorInfo = async () => {
        try {
          const res = await fetch(
            `https://harmoniq-6.onrender.com/users/${id}`
          );
          if (!res.ok) throw new Error("Failed to fetch author info");
          const data = await res.json();
          setAuthorInfo(data);
        } catch (error) {
          console.error("Error loading author info:", error);
        }
      };

      fetchAuthorInfo();
    }
  }, [id, isOwnProfile]);

  useEffect(() => {
    dispatch(resetAuthorArticles());

    if (isOwnProfile) {
      if (activeTab === "my") {
        dispatch(fetchCreatedArticles());
      } else {
        dispatch(fetchSavedArticles());
      }
    } else {
      dispatch(fetchAuthorArticles({ authorId: id, page: 1 }));
    }

    setVisibleCount(12);
  }, [id, dispatch, isOwnProfile, activeTab]);

  useEffect(() => {
    if (isOwnProfile && visibleCount > 12 && newItemRef.current) {
      newItemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prevDataLength.current = allArticles.length;
  }, [visibleCount, isOwnProfile]);

  const handleLoadMore = () => {
    if (isOwnProfile) {
      setVisibleCount((prev) => prev + 12);
    } else {
      dispatch(fetchAuthorArticles({ authorId: id, page })).then(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  };

  const allArticles = isOwnProfile
    ? activeTab === "my"
      ? createdArticles
      : savedArticles
    : articles;

  const displayArticles = isOwnProfile
    ? allArticles.slice(0, visibleCount)
    : allArticles;

  const articleCount = allArticles.length;

  const displayName = isOwnProfile ? currentUser?.name : authorInfo?.name;
  const avatarUrl = isOwnProfile ? currentUser?.avatar : authorInfo?.avatarUrl;

  const emptyText =
    isOwnProfile && activeTab === "saved"
      ? "Save your first article"
      : "Write your first article";

  const emptyBtnText =
    isOwnProfile && activeTab === "saved"
      ? "Go to articles"
      : "Create an article";

  const emptyBtnLink =
    isOwnProfile && activeTab === "saved" ? "/articles" : "/create";

  return (
    <div className={`container ${styles.wrapper}`}>
      {isOwnProfile && <h1 className={styles.profileTitle}>My Profile</h1>}
      <div className={styles.authorHeader}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            width="137"
            height="137"
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {displayName?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h2 className={styles.name}>{displayName}</h2>
          <p className={styles.count}>{articleCount} articles</p>
        </div>
      </div>

      {isOwnProfile && (
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "my" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("my")}
            disabled={activeTab === "my"}
          >
            My Articles
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "saved" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("saved")}
            disabled={activeTab === "saved"}
          >
            Saved Articles
          </button>
        </div>
      )}

      {displayArticles?.length === 0 ? (
        <div className={styles.emptyWrapper}>
          <img src={AlertIcon} alt="Alert icon" className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>Nothing found.</h3>
          <p className={styles.emptyText}>{emptyText}</p>
          <Link to={emptyBtnLink} className={styles.emptyBtn}>
            {emptyBtnText}
          </Link>
        </div>
      ) : (
        <>
          <ArticlesListReusable
            articles={displayArticles}
            isOwnProfile={isOwnProfile}
            activeTab={activeTab}
            currentUserId={currentUser?._id}
            newItemRef={newItemRef}
            firstNewIndex={visibleCount - 12}
          />

          {(isOwnProfile
            ? displayArticles.length < allArticles.length
            : hasMore) && (
            <button
              className={styles.loadMoreBtn}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
