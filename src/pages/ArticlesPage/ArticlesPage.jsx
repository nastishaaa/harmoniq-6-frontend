import styles from "./ArticlesPage.module.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Loader } from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/articles/operations";
import Select from "react-select";
import {
  selectArticles,
  selectErrorArticles,
  selectLoadingArticles,
} from "../../redux/articles/selectors";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import { ModalErrorSave } from "../../components/ModalErrorSave/ModalErrorSave";

export default function ArticlesPage() {
  const articlesItems = useSelector(selectArticles);
  const isLoading = useSelector(selectLoadingArticles);
  const isError = useSelector(selectErrorArticles);

  const [selectedOption, setSelectedOption] = useState({
    value: "popular",
    label: "Popular",
  });
  const options = [
    { value: "all", label: "All" },
    { value: "popular", label: "Popular" },
  ];
  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: "169px",
      height: "33px",
      minHeight: "33px",
      padding: "auto",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #9f9f9f",
      color: "#595d62",
      boxSizing: "border-box",
      boxShadow: state.isFocused ? "0 0 2px #595d62" : "none",
      cursor: "pointer",
      "&:hover": {
        boxShadow: "0 0 2px #595d62",
      },
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? "#D1E0D8" : isFocused ? "#F7FFFB" : "white",
      color: "#333",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#595d62",
    }),
  };

  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(fetchArticles());
  }, [dispatch]);

  const articlesItemsLength = articlesItems.length;

  return (
    <div className={styles.section}>
      <ModalErrorSave />
      <SectionTitle title="Articles" />
      {articlesItemsLength > 0 && (
        <div className={styles.infoPanel}>
          <p className={styles.itemsTotal}>
            {articlesItemsLength > 1
              ? ` ${articlesItemsLength} articles`
              : `${articlesItemsLength} article`}
          </p>
          <Select
            value={selectedOption}
            onChange={setSelectedOption}
            options={options}
            styles={customStyles}
            isSearchable={false}
          />
        </div>
      )}
      {articlesItemsLength > 0 && <ArticlesList />}
      {/* {articlesItemsLength === 0 && <SectionTitle title="The articles not found" />} */}
      {isLoading && <Loader />}
      {isError && <p>Упс,помилка</p>}
      {articlesItemsLength > 0 && (
        <button className={styles.btnLoadMore}>LoadMore</button>
      )}{" "}
    </div>
  );
}
