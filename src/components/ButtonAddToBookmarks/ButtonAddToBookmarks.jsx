import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import clsx from "clsx";
import styles from "./ButtonAddToBookmarks.module.css";
import { setIsModalErrorSaveOpen } from "../../redux/global/slice";
import { selectIsLoggedIn } from "../../redux/authorization/selectors";

export default function ButtonAddToBookmarks({ articleId, children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  // Підвантажую початковий стан isSaved
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchSavedStatus = async () => {
      try {
        const res = await fetch(`/api/articles/${articleId}/is-saved`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch saved status");

        const data = await res.json();
        setIsSaved(data.isSaved);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedStatus();
  }, [articleId, isLoggedIn]);

  const handleClick = async () => {
    if (!isLoggedIn) {
      dispatch(setIsModalErrorSaveOpen(true));
      return;
    }

    setIsLoading(true);

    try {
      const url = `/api/articles/${articleId}/${isSaved ? "unsave" : "save"}`;
      const method = isSaved ? "DELETE" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update bookmark");

      setIsSaved(!isSaved);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={clsx(styles.button, isSaved && styles.saved)}
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Toggle save article"
      aria-pressed={isSaved}
    >
      {isLoading ? <span className={styles.spinner}></span> : children}
    </button>
  );
}
