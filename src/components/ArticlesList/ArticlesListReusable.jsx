import ArticlesItem from "../ArticlesItem/ArticlesItem";
import s from "./ArticlesList.module.css";

export default function ArticlesListReusable({
  articles,
  isOwnProfile = false,
  activeTab = "my",
  currentUserId = null,
}) {
  return (
    <ul className={s.list}>
      {(Array.isArray(articles) ? articles : []).map((article, index) => (
        <li key={article._id}>
          <ArticlesItem
            article={article}
            id={article._id}
            isOwnProfile={isOwnProfile}
            activeTab={activeTab}
            currentUserId={currentUserId}
          />
        </li>
      ))}
    </ul>
  );
}
