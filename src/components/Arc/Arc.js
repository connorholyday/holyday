import React from 'react'
import styles from './Arc.module.css'

const Arc = ({ radius, children }) => {
  const chars = [...children.split(''), ' ']
  const angle = 360 / chars.length

  return (
    <div className={styles.spin}>
      <p
        className={styles.arc}
        style={{ height: radius * 2, width: radius * 2, margin: 0 }}
        aria-label={children}
      >
        {chars.map((char, index) => (
          <span
            key={index}
            style={{
              height: radius,
              position: 'absolute',
              transform: `rotate(${angle * (index + 1)}deg)`,
              transformOrigin: '0 100%',
            }}
            aria-hidden="true"
          >
            {char}
          </span>
        ))}
      </p>
    </div>
  )
}

export default Arc
