import clsx from 'clsx'
import { Rings } from 'react-loader-spinner'

import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Rings ariaLabel="loading-spinner" wrapperClass="wrapper" color="#649179" />
        <p className={clsx(styles.caption, styles.shinyText)} style={{ animationDuration: '3s' }}>
          Loading, please wait...
        </p>
      </div>
    </div>
  )
}
