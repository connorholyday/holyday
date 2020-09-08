import React from 'react'
import styles from './NotFound.module.css'
import Animate from '../animate'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

const NotFound = ({ transition, profile }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [toggle, set] = React.useState(true)
  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])
  return (
    <div className={styles.content}>
      <h1 className={styles.centered}>
        <Animate toggle={toggle}>404 - Oops you're lost!</Animate>
      </h1>
    </div>
  )
}

export default NotFound
