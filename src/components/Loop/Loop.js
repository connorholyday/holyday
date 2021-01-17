import React from 'react'
import { Link } from 'gatsby'
import { useSpring, useTrail, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer';

import { rhythm } from '../../utils/typography'
import Raise from '../Raise'
import { TRANSITION_DELAY_IN_MS } from '../constants'
import Animate from '../animate'
import styles from './Loop.module.css'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

const Item = ({ style, media }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });
  return (
    <animated.article
      ref={ref}
      className={styles.item}
      style={style}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
      >
        {inView && (<source src={media} type="video/webm"></source>)}
      </video>
    </animated.article>
  )
}

const Loop = ({ transition, images }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [toggle, set] = React.useState(true)
  const [onScreen, setOnScreen] = React.useState([...Array(images.length)].map(() => false))

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
          <Animate toggle={toggle}>Loops</Animate>
        </h1>
        <animated.p style={{
          transform: y.interpolate(y => `translate3d(0,${y}%,0)`),
          opacity,
        }}>A collection made with react-three-fiber and good old GLSL shaders.<br />In search of the perfect loop.</animated.p>
      </div>
      {trail.map(({ yr, opacity, ...rest }, index) => (
        <Item
          key={index}
          style={{
            transform: yr.interpolate(
              (y, r) => `translate3d(0,${y}%,0) rotate(${r}deg)`
            ),
            opacity,
            ...rest,
          }}
          media={images.get(`loop-${images.size - index}`)}
        />
      ))}
    </>
  )
}

export default Loop
