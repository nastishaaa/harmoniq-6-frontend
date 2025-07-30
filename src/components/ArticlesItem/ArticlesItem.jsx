import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks'
import styles from './ArticlesItem.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsModalErrorSaveOpen } from '../../redux/global/slice'

export default function ArticlesItem({ article, id }) {
  const dispath = useDispatch()

  return (
    <article key={id} className={styles.card}>
      <img src={article.img} alt={article.title} className={styles.image} loading="lazy" />
      <div className={styles.content}>
        <p className={styles.author}>{article.ownerId.$oid}</p>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.desc}</p>
      </div>
      <div className={styles.bottomNavi}>
        <Link
          to={`/articles/${id}`}
          className={styles.btnLearnMore}
          aria-label={`Learn more about the article titled: ${article.title}`}
        >
          Learn more
        </Link>
        <div onClick={() => dispath(setIsModalErrorSaveOpen(true))}>
          <ButtonAddToBookmarks articleId={id}>
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
              className={styles.bookmarkIcon}
            >
              <rect x="1" y="0.5" width="39" height="39" rx="19.5" stroke="#374F42" />
              <path
                d="M20.4971 11.5C21.7607 11.5 22.9206 11.6209 23.8398 11.7607C25.0036 11.9378 25.916 12.7353 26.1758 13.8496C26.4894 15.1948 26.7969 17.2414 26.7441 19.9902C26.6859 23.0233 26.2432 25.2117 25.8164 26.6396C25.701 27.0256 25.4339 27.2243 25.1318 27.2754C24.816 27.3287 24.4263 27.2236 24.1094 26.9082C23.5326 26.334 22.8719 25.7138 22.2627 25.2344C21.9586 24.9951 21.6558 24.7817 21.375 24.626C21.1101 24.4791 20.7995 24.3457 20.4971 24.3457C20.1993 24.3457 19.8783 24.4769 19.5977 24.6211C19.2986 24.7747 18.9675 24.9855 18.6289 25.2246C17.9504 25.7037 17.1989 26.3244 16.5371 26.8994C16.1878 27.2029 15.7764 27.2747 15.4521 27.1865C15.1392 27.1013 14.8752 26.8609 14.7939 26.4424C14.5149 25.0044 14.25 22.8805 14.25 20C14.25 17.1265 14.5461 15.0997 14.8408 13.7949C15.085 12.7136 15.9671 11.9437 17.1016 11.7686C18.0289 11.6253 19.2091 11.5 20.4971 11.5Z"
                stroke="#374F42"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ButtonAddToBookmarks>
        </div>
      </div>
    </article>
  )
}
