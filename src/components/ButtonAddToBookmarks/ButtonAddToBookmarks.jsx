import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import clsx from "clsx";
import styles from "./ButtonAddToBookmarks.module.css";
import { setIsModalErrorSaveOpen } from "../../redux/global/slice";
import { selectIsLoggedIn } from "../../redux/authorization/selectors";
import { selectSavedArticles } from "../../redux/user/userSelectors";
import {
  getSavedArticlesThunk,
  removeSavedArticleThunk,
  saveArticleThunk,
} from "../../redux/user/savedArticlesOperations";

export default function ButtonAddToBookmarks({ articleId, children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const token = useSelector(selectToken);
  // console.log("token:", token);
  const savedArticles = useSelector(selectSavedArticles);
  const [isLoading, setIsLoading] = useState(false);
  const isSaved = savedArticles?.some((item) => item._id === articleId);

  useEffect(() => {
    if (!isLoggedIn) return;
    // console.log("useEffect запустився");
    // const fetchSavedStatus = async () => {
    //   try {
    //     console.log("token in useEffect:", token);
    //     const res = await fetch("/api/users/me/saved-articles", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "application/json",
    dispatch(getSavedArticlesThunk());
  }, [dispatch, isLoggedIn]);
  //         },
  //       });

  //       if (!res.ok) throw new Error("Failed to fetch saved articles");

  //       const data = await res.json();
  //       console.log("Отримано saved articles:", data);
  //       const isArticleSaved = data.data.some((item) => item._id === articleId);
  //       setIsSaved(isArticleSaved);
  //     } catch (error) {
  //       console.error("Error fetching saved articles:", error);
  //     }
  //   };

  //   fetchSavedStatus();
  // }, [articleId, isLoggedIn, token]);

  const handleClick = async () => {
    if (!isLoggedIn) {
      dispatch(setIsModalErrorSaveOpen(true));
      return;
    }

    setIsLoading(true);

    try {
      if (isSaved) {
        await dispatch(removeSavedArticleThunk(articleId)).unwrap();
        toast.success("Article removed from saved items");
      } else {
        await dispatch(saveArticleThunk(articleId)).unwrap();
        toast.success("Article saved");
      }

      // оновлюємо список після зміни
      await dispatch(getSavedArticlesThunk());
    } catch (error) {
      toast.error(error || "Error updating saved");
    } finally {
      setIsLoading(false);
    }
  };

  //   try {
  //     const method = isSaved ? "DELETE" : "POST";
  //     console.log("token:", token);
  //     const res = await fetch(`/api/users/me/saved-articles/${articleId}`, {
  //       method,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!res.ok) {
  //       const data = await res.json();
  //       throw new Error(data?.message || "Failed to update bookmark");
  //     }

  //     setIsSaved((prev) => {
  //       const newState = !prev;
  //       if (newState) {
  //         toast.success("Article saved");
  //       } else {
  //         toast.success("Article removed from saved items");
  //       }
  //       return newState;
  //     });
  //   } catch (error) {
  //     toast.error(error.message || "Error updating saved");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
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
