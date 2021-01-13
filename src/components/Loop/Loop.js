import React from 'react'
import { Link } from 'gatsby'
import { useSpring, useTrail, animated } from 'react-spring'

import { rhythm } from '../../utils/typography'
import Raise from '../Raise'
import { TRANSITION_DELAY_IN_MS } from '../constants'
import Animate from '../animate'
import styles from './Loop.module.css'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

const Loop = ({ transition, images }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [toggle, set] = React.useState(true)

  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])
  const { y, opacity } = useSpring({
    delay: TRANSITION_DELAY_IN_MS + 0.3,
    y: toggle ? 0 : -5,
    opacity: toggle ? 1 : 0,
    from: { y: 5, opacity: 0 },
    immediate: prefersReducedMotion,
  })
  const trail = useTrail(images.size, {
    config: {
      duration: TRANSITION_DELAY_IN_MS,
    },
    yr: toggle ? [0, 0] : [-5, -2],
    opacity: toggle ? 1 : 0,
    from: { yr: [5, 2], opacity: 0 },
    immediate: prefersReducedMotion,
  })

  return (
    <>
      <div className={styles.content}>
        <h1 style={{ margin: `0 0 ${rhythm(1)}` }}>
          <Animate toggle={toggle}>Dots</Animate>
        </h1>
        <animated.p style={{
          transform: y.interpolate(y => `translate3d(0,${y}%,0)`),
          opacity,
        }}>In search of the perfect loop</animated.p>
      </div>
      {trail.map(({ yr, opacity, ...rest }, index) => (
        <animated.article
          key={index}
          className={styles.item}
          style={{
            transform: yr.interpolate(
              (y, r) => `translate3d(0,${y}%,0) rotate(${r}deg)`
            ),
            opacity,
            ...rest,
          }}
        >
          <img
            src={images.get(`dots-${index + 1}`)}
            alt=""
          />
        </animated.article>
      ))}
    </>
  )
}

export default Loop
