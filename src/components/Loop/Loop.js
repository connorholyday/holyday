import React from 'react'
import { Link } from 'gatsby'
import { useSpring, useTrail, animated } from 'react-spring'

import { rhythm } from '../../utils/typography'
import Raise from '../Raise'
import { TRANSITION_DELAY_IN_MS } from '../constants'
import Animate from '../animate'
import Article from '../Article'
import styles from './Loop.module.css'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

const links = [
  'https://codesandbox.io/s/webgl-image-splash-5x002?file=/src/Image.js',
  'https://codesandbox.io/s/long-pond-2fjms?file=/src/App.js',
  'https://codesandbox.io/s/long-pond-2fjms?file=/src/App.js',
  'https://codesandbox.io/s/long-pond-2fjms?file=/src/App.js',
  'https://codesandbox.io/s/long-pond-2fjms?file=/src/App.js',
  'https://codesandbox.io/s/long-pond-2fjms?file=/src/App.js',
]

const Loop = ({ transition, images, loading }) => {
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
          <Animate toggle={toggle}>Loops</Animate>
        </h1>
        <animated.p style={{
          transform: y.interpolate(y => `translate3d(0,${y}%,0)`),
          opacity,
        }}>A collection made with react-three-fiber and good old GLSL shaders.<br />In search of the perfect loop.</animated.p>
      </div>
      {trail.map(({ yr, opacity, ...rest }, index) => (
        <Article
          key={index}
          style={{
            transform: yr.interpolate(
              (y, r) => `translate3d(0,${y}%,0) rotate(${r}deg)`
            ),
            opacity,
            ...rest,
          }}
          link={links[index]}
          video={images.get(`loop-${images.size - index}`)}
          loading={loading}
        />
      ))}
    </>
  )
}

export default Loop
