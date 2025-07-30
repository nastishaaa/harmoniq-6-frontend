import styles from './ArticlesPage.module.css'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'

import { selectArticles, selectError, selectLoading } from '../../redux/articles/selectors'
import ArticlesList from '../../components/ArticlesList/ArticlesList'
import { ModalErrorSave } from '../../components/ModalErrorSave/ModalErrorSave'

export default function ArticlesPage() {
  const articlesItems = useSelector(selectArticles)
  const isLoading = useSelector(selectLoading)
  const isError = useSelector(selectError)

  const [selectedOption, setSelectedOption] = useState({
    value: 'popular',
    label: 'Popular',
  })
  const options = [
    { value: 'all', label: 'All' },
    { value: 'popular', label: 'Popular' },
  ]
  const customStyles = {
    control: (base) => ({
      ...base,
      width: '169px',
      padding: '4px 8px',
      fontSize: '16px',
      borderRadius: '8px',
      borderColor: '#9f9f9f',
      boxShadow: 'none',
      cursor: 'pointer',
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected ? '#649179' : isFocused ? '#eef4f0' : 'white',
      color: '#333',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#595d62',
    }),
  }

  useEffect(() => {
    console.log('Юз eфект спрацював')
  }, [])

  const articlesItemsLength = articlesItems.length

  return (
    <div className={styles.section}>
      <ModalErrorSave />
      <SectionTitle title="Articles" />
      <div className={styles.infoPanel}>
        <p className={styles.itemsTotal}>
          {articlesItemsLength > 1 ? ` ${articlesItemsLength} articles` : `${articlesItemsLength} article`}
        </p>
        {/* <select name="filter" id="filter" className={styles.filter}>
          <option value="all">All</option>
          <option value="popular">Popular</option>
        </select>{" "} */}
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
          styles={customStyles}
          className={styles.filterSelect}
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
