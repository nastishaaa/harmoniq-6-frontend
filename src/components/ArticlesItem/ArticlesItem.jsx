import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import styles from "./ArticlesItem.module.css";

import { selectSavedArticles } from "../../redux/user/userSelectors";
import { useSaveArticle } from "../UsersHooks/useSaveArticle";
import { useDeleteSavedArticle } from "../UsersHooks/useDeleteSavedArticle";

export default function ArticlesItem({
  article,
  id,
  isOwnProfile,
  activeTab,
  currentUserId,
}) {
  const saved = useSelector(selectSavedArticles);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { saveArticle } = useSaveArticle();
  const { deleteSavedArticle } = useDeleteSavedArticle();

  useEffect(() => {
    setIsSaved(saved.includes(article._id));
  }, [saved, article._id]);

  const handleToggleBookmark = async () => {
    if (!currentUserId) {
      toast.error("You must be logged in to save articles.");
      return;
    }

    setIsLoading(true);

    try {
      if (isSaved) {
        await deleteSavedArticle(currentUserId, article._id);
        toast.success("Removed from bookmarks!");
      } else {
        await saveArticle(currentUserId, article._id);
        toast.success("Added to bookmarks!");
      }
    } catch (err) {
      toast.error("Bookmark action failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isOwnArticle = article.ownerId === currentUserId;

  return (
    <article className={styles.card}>
      <img
        src={article.img}
        alt={article.title}
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.content}>
        <p className={styles.author}>{article.author}</p>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.desc}</p>
      </div>

      <div className={styles.bottomNavi}>
        <Link
          to={`/articles/${id}`}
          className={styles.btnLearnMore}
          aria-label={`Learn more about the article titled: ${article.title}`}
        >
          Learn more
        </Link>

        {!isOwnArticle && (
          <ButtonAddToBookmarks
            isSaved={isSaved}
            isDisabled={isLoading}
            onClick={handleToggleBookmark}
          />
        )}
      </div>
    </article>
  );
}
