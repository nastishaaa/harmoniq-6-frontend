import { useNavigate } from 'react-router-dom'

import styles from './AuthorsItem.module.css'

const AuthorsItem = ({ author, ref, isShowOnlyName = false }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/users/${author._id}`)
  }

  let name = author.name;
  if (isShowOnlyName) { 
    name = author.name.split(' ')[0] // Show only the first name
  }

  return (
    <li className={styles.authorsItem} ref={ref}>
      <div style={{ cursor: 'pointer' }} onClick={handleClick}>
        <img src={author.avatarUrl} alt={author.name} className={styles.authorImage} />
        <p className={styles.authorName}>{name}</p>
      </div>
    </li>
  )
}

export default AuthorsItem
