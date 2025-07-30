import clsx from 'clsx'
import { BeatLoader } from 'react-spinners'

import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <BeatLoader color="#374f42a4" />
        <p className={clsx(styles.caption, styles.shinyText)} style={{ animationDuration: '3s' }}>
          Loading, please wait...
        </p>
      </div>
    </div>
  )
}
