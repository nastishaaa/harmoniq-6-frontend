import clsx from 'clsx'

import styles from './Pagination.module.css'

export const Pagination = ({ currentPage = 2, pages = 10 }) => {
  const renderPages = () => {
    const pageElements = []

    if (pages === 1) <div className={clsx(styles.page, styles.currentPage)}>1</div>
    else {
      pageElements.push(
        <div key={1} className={clsx(styles.page, { [styles.currentPage]: currentPage === 1 })}>
          1
        </div>
      )
    }

    if (currentPage > 4) {
      pageElements.push(
        <div key="ellipsis" className={styles.ellipsis}>
          ...
        </div>
      )
    }

    const middleStart = Math.max(2, currentPage - 1)
    const middleEnd = Math.min(pages - 1, currentPage + 2)

    for (let i = middleStart; i <= middleEnd; i++) {
      pageElements.push(
        <div key={i} className={clsx(styles.page, { [styles.currentPage]: currentPage === i })}>
          {i}
        </div>
      )
    }

    if (currentPage < pages - 3) {
      pageElements.push(
        <div key="end-ellipsis" className={styles.ellipsis}>
          ...
        </div>
      )
    }

    pageElements.push(
      <div key={pages} className={clsx(styles.page, { [styles.currentPage]: currentPage === pages })}>
        {pages}
      </div>
    )

    return pageElements
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <img className={clsx(styles.icon, styles.iconPrev)} src="src/assets/icons/top-right.svg" alt="Arrow icon" />
      </div>
      <div className={styles.pages}>{renderPages()}</div>
      <div className={clsx(styles.iconWrapper, styles.iconNext)}>
        <img className={clsx(styles.icon, styles.iconNext)} src="src/assets/icons/top-right.svg" alt="Arrow icon" />
      </div>
    </div>
  )
}
