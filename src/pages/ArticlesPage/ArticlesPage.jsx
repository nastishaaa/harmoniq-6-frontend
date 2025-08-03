import styles from "./ArticlesPage.module.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Loader } from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../redux/articles/operations";
import Select from "react-select";
import {
  selectErrorArticles,
  selectLoadingArticles,
  selectTotalArticles,
  selectHasNextPage,
  selectArticles,
} from "../../redux/articles/selectors";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import { ModalErrorSave } from "../../components/ModalErrorSave/ModalErrorSave";
import { Link } from "react-router-dom";

export default function ArticlesPage() {
  const isLoading = useSelector(selectLoadingArticles);
  const isError = useSelector(selectErrorArticles);
  const articles = useSelector(selectArticles);
  const totalArticles = useSelector(selectTotalArticles);
  const hasNextPage = useSelector(selectHasNextPage);

  const [selectedOption, setSelectedOption] = useState({
    value: "popular",
    label: "Popular",
  });
  const [page, setPage] = useState(1);

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
    setPage(1);
  }, [selectedOption]);

  useEffect(() => {
    dispatch(fetchArticles({ filter: selectedOption.value, page }));
  }, [dispatch, selectedOption, page]);

  const handleLoadMore = () => {
    if (!isLoading && hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.section}>
      <ModalErrorSave />
      {<SectionTitle title="Articles" />}{" "}
      {totalArticles > 0 && articles && (
        <div className={styles.infoPanel}>
          <p className={styles.itemsTotal}>
            {totalArticles > 1
              ? ` ${totalArticles} articles`
              : `${totalArticles} article`}
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
      <ArticlesList />
      {isLoading && <Loader />}
      {isError && (
        <div className={styles.notFoundWrapper}>
          <h2 className={styles.notFoundTitle}>No articles available</h2>
          <Link to="/" className={styles.goBackLink}>
            Go back to home
          </Link>
        </div>
      )}
      {hasNextPage && (
        <button className={styles.btnLoadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}{" "}
    </div>
  );
}
