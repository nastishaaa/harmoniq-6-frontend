import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthorsItem.module.css";

const AuthorsItem = ({ author, isShowOlyName=false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${author._id}`);
  };

  let name = author.name;
  if (isShowOlyName) { 
    name = name.split(" ")[0]; // Show only the first name
  }

  return (
    <li className={styles.authorsItem} onClick={handleClick}>
      <img
        src={author.avatarUrl}
        alt={author.name}
        className={styles.authorImage}
      />
      <p className={styles.authorName}>{name}</p>
    </li>
  );
};

export default AuthorsItem;
