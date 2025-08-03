import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authors } from '../../redux/authors/selectors'
import { fetchAuthors } from '../../redux/authors/operations'
import AuthorsList from '../../components/AuthorsList/AuthorsList'

import styles from './AuthorsPage.module.css'

const AuthorsPage = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const { data, pagination } = useSelector(authors) || {}

  const newItemRef = useRef(null)
  const prevDataLength = useRef(0)

  useEffect(() => {
    dispatch(fetchAuthors({ page }))
  }, [dispatch, page])

  useEffect(() => {
    if (page > 1 && newItemRef.current) {
      newItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    prevDataLength.current = data?.length || 0
  }, [data, page])
  const handleLoadMore = () => {
    if (pagination?.hasMore) setPage((prev) => prev + 1)
  }

  const firstNewIndex = prevDataLength.current

  return (
    <div className={styles.authorsPage}>
      <h1 className={styles.authorsName}>Authors</h1>
      {data && <AuthorsList authors={data} newItemRef={newItemRef} firstNewIndex={firstNewIndex} />}
      {pagination?.hasMore && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  )
}

export default AuthorsPage
