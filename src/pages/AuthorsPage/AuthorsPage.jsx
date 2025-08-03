import React, { useState, useEffect } from "react";
import AuthorsList from "../../components/AuthorsList/AuthorsList";
import styles from "./AuthorsPage.module.css";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const authorsPerPage = 20;

  useEffect(() => {
    fetchAuthors(page);
  }, [page]);

  const fetchAuthors = async (pageNumber) => {
    try {
      const response = await fetch(
        `https://harmoniq-6.onrender.com/users?page=${pageNumber}&perPage=${authorsPerPage}`
      );

      if (!response.ok) {
        throw new Error("Error loading authors");
      }

      const data = await response.json();

      if (data?.data) {
        setAuthors((prev) => [...prev, ...data.data]);
        setHasMore(data.pagination?.hasMore);
      }
    } catch (error) {
      console.error("Error loading authors:", error);
    }
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={styles.authorsPage}>
      <h1 className={styles.authorsName}>Authors</h1>
      <AuthorsList authors={authors} />
      {hasMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default AuthorsPage;
