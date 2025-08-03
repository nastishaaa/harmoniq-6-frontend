import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import clsx from "clsx";
import styles from "./ButtonAddToBookmarks.module.css";
import { setIsModalErrorSaveOpen } from "../../redux/global/slice";
import { selectIsLoggedIn } from "../../redux/authorization/selectors";

export default function ButtonAddToBookmarks({ articleId }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Отримати стан, чи збережена ця стаття
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchSavedStatus = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/users/me/saved-articles",
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch saved status");

        const data = await res.json();
        const isAlreadySaved = data.data.some(
          (article) => article._id === articleId
        );
        setIsSaved(isAlreadySaved);
      } catch (error) {
        console.error("Error fetching saved status:", error);
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
      const method = isSaved ? "DELETE" : "POST";
      const url = `http://localhost:3000/api/users/me/saved-articles/${articleId}`;
      const res = await fetch(url, {
        method,
        credentials: "include",
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || "Failed to update bookmark");
      }

      setIsSaved((prev) => !prev);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={clsx(styles.bookmarkBtn)}
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isSaved ? "Remove from bookmarks" : "Add to bookmarks"}
      aria-pressed={isSaved}
    >
      {isLoading ? (
        <span className={styles.spinner}></span>
      ) : (
        <svg
          className={clsx("bookmarkIcon", isSaved && styles.saved)}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a3a3a3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      )}
    </button>
  );
}
