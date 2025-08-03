import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthorsItem.module.css";

const AuthorsItem = ({ author }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${author._id}`);
  };

  return (
    <li className={styles.authorsItem} onClick={handleClick}>
      <img
        src={author.avatarUrl}
        alt={author.name}
        className={styles.authorImage}
      />
      <p className={styles.authorName}>{author.name}</p>
    </li>
  );
};

export default AuthorsItem;
