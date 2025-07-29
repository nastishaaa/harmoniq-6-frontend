import React, { useState, useEffect } from 'react'
import AuthorsList from '../../components/AuthorsList/AuthorsList'
import styles from './AuthorsPage.module.css'

const AuthorsPage = () => {
  const [allAuthors, setAllAuthors] = useState([])
  const [visibleAuthors, setVisibleAuthors] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const authorsPerPage = 20

  useEffect(() => {
    fetchAuthors()
  }, [])

  const fetchAuthors = async () => {
    try {
      const response = await fetch('https://harmoniq-6.onrender.com/users/authors')

      if (!response.ok) {
        throw new Error('Ошибка при загрузке авторов')
      }

      const data = await response.json()

      if (data && data.data) {
        setAllAuthors(data.data)
        setVisibleAuthors(data.data.slice(0, authorsPerPage))
        setHasMore(data.data.length > authorsPerPage)
      }
    } catch (error) {
      console.error('Ошибка при загрузке авторов:', error)
    }
  }

  const handleLoadMore = () => {
    const currentLength = visibleAuthors.length
    const newVisible = allAuthors.slice(0, currentLength + authorsPerPage)
    setVisibleAuthors(newVisible)
    setHasMore(newVisible.length < allAuthors.length)
  }

  return (
    <div className={styles.authorsPage}>
      <h1 className={styles.authorsName}>Authors</h1>
      <AuthorsList authors={visibleAuthors} />
      {hasMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  )
}

export default AuthorsPage
