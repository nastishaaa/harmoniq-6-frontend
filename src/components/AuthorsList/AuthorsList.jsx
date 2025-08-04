import AuthorsItem from '../AuthorsItem/AuthorsItem'

import styles from './AuthorsList.module.css'

const AuthorsList = ({ authors, newItemRef, firstNewIndex }) => {
  if (!authors.length) {
    return <p>No author info to show at the moment.</p>
  }

  return (
    <ul className={styles.authorsList}>
      {authors.map((author, index) => {
        const refForThis = index === firstNewIndex ? newItemRef : null
        return <AuthorsItem key={index} author={author} ref={refForThis} />
      })}
    </ul>
  )
}

export default AuthorsList
