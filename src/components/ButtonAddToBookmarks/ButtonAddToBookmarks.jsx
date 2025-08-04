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

        if (!res.ok) throw new Error("Failed to fetch saved articles");

        const data = await res.json();
        const isArticleSaved = data.data.some((item) => item._id === articleId);
        setIsSaved(isArticleSaved);
      } catch (error) {
        console.error("Error fetching saved articles:", error);
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
      const res = await fetch(
        `http://localhost:3000/api/users/me/saved-articles/${articleId}`,
        {
          method,
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to update bookmark");
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
