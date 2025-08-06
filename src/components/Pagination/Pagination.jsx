import clsx from 'clsx'

import ArrowIcon from '../../assets/icons/top-right.svg'

import styles from './Pagination.module.css'

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const renderPages = () => {
    const pageElements = []

    if (totalPages >= 1) {
      pageElements.push(
        <div
          key={1}
          className={clsx(styles.page, { [styles.currentPage]: currentPage === 1 })}
          onClick={() => onPageChange(1)}
        >
          1
        </div>
      )
    }

    if (currentPage > 4) {
      pageElements.push(
        <div key="ellipsis1" className={styles.ellipsis}>
          ...
        </div>
      )
    }

    const middleStart = Math.max(2, currentPage - 1)
    const middleEnd = Math.min(totalPages - 1, currentPage + 1)

    for (let i = middleStart; i <= middleEnd; i++) {
      pageElements.push(
        <div
          key={i}
          className={clsx(styles.page, { [styles.currentPage]: currentPage === i })}
          onClick={() => onPageChange(i)}
        >
          {i}
        </div>
      )
    }

    if (currentPage < totalPages - 3) {
      pageElements.push(
        <div key="ellipsis2" className={styles.ellipsis}>
          ...
        </div>
      )
    }

    if (totalPages > 1) {
      pageElements.push(
        <div
          key={totalPages}
          className={clsx(styles.page, { [styles.currentPage]: currentPage === totalPages })}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </div>
      )
    }

    return pageElements
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper} onClick={() => onPageChange(Math.max(1, currentPage - 1))}>
        <img className={clsx(styles.icon, styles.iconPrev)} src={ArrowIcon} />
      </div>
      <div className={styles.pagesContainer}>{renderPages()}</div>
      <div
        className={clsx(styles.iconWrapper, styles.iconNext)}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        <img className={clsx(styles.icon, styles.iconNext)} src={ArrowIcon} />
      </div>
    </div>
  )
}
