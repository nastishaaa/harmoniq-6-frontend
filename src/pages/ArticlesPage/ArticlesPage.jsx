import styles from './ArticlesPage.module.css'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import {
  selectArticles,
  selectError,
  selectLoading,
} from "../../redux/articles/selectors";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import { ModalErrorSave } from '../../components/ModalErrorSave/ModalErrorSave'

export default function ArticlesPage() {
  const articlesItems = useSelector(selectArticles);
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

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

  // useEffect(() => {
  //   console.log('Юз eфект спрацював')
  // }, [])
  
  // Потрібний ефект для скролу на початок сторінки після переходу на сторінку ArticlesPage
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const articlesItemsLength = articlesItems.length;

  return (
    <div className={styles.section}>
      <ModalErrorSave />
      <SectionTitle title="Articles" />
      <div className={styles.infoPanel}>
        <p className={styles.itemsTotal}>
          {articlesItemsLength > 1 ? ` ${articlesItemsLength} articles` : `${articlesItemsLength} article`}
        </p>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
          styles={customStyles}
           isSearchable={false}
        />
      </div>{' '}
      {articlesItemsLength > 0 && <ArticlesList />}
      {isLoading && <p>Почекайте</p>}
      {isError && <p>Упс,помилка</p>}
      <button className={styles.btnLoadMore}>LoadMore</button>
    </div>
  )
}
