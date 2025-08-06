import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import clsx from "clsx";
import styles from "./ButtonAddToBookmarks.module.css";
import { setIsModalErrorSaveOpen } from "../../redux/global/slice";
import {
  selectIsLoggedIn,
  selectToken,
} from "../../redux/authorization/selectors";
import { selectSavedArticles } from "../../redux/user/userSelectors";
import {
  removeSavedArticleThunk,
  saveArticleThunk,
} from "../../redux/user/savedArticlesOperations";

export default function ButtonAddToBookmarks({ articleId, children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);
  // console.log("token:", token);
  const savedArticles = useSelector(selectSavedArticles);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !token || !savedArticles) {
      setIsSaved(false);
      return;
    }
    const isArticleSaved = savedArticles.some(
      (article) => article._id === articleId
    );
    setIsSaved(isArticleSaved);
  }, [savedArticles, articleId, isLoggedIn, token]);

  const handleClick = async () => {
    if (!isLoggedIn || !token) {
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
      setIsSaved((prev) => !prev);
    } catch (error) {
      toast.error(error || "Failed to save/delete article");
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
      {isLoading ? (
        <span className={styles.spinner}></span>
      ) : React.isValidElement(children) ? (
        React.cloneElement(children, {
          className: clsx(
            children.props.className,
            isSaved && styles.bookmarkIcon
          ),
        })
      ) : (
        children
      )}
    </button>
  );
}
