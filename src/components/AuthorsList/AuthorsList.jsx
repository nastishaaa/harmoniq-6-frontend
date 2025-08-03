import React from "react";
import AuthorsItem from "../AuthorsItem/AuthorsItem";
import styles from "./AuthorsList.module.css";

const AuthorsList = ({ authors }) => {
  if (!authors.length) {
    return <p>No author info to show at the moment.</p>;
  }

  return (
    <ul className={styles.authorsList}>
      {authors.map((author, index) => (
        <AuthorsItem key={index} author={author} />
      ))}
    </ul>
  );
};

export default AuthorsList;
