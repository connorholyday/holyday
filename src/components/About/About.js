import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { useSpring, animated } from 'react-spring'

import { rhythm } from '../../utils/typography'
import styles from './About.module.css'
import { ExternalLink } from '../Link'
import Animate from '../animate'
import { TRANSITION_DELAY_IN_MS } from '../constants'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

const About = ({ transition, profile }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [toggle, set] = React.useState(true)
  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])
  const { yr, opacity } = useSpring({
    delay: TRANSITION_DELAY_IN_MS + 0.3,
    yr: toggle ? [0, 0] : [-5, -2],
    opacity: toggle ? 1 : 0,
    from: { yr: [5, 2], opacity: 0 },
    immediate: prefersReducedMotion,
  })
  return (
    <>
      <animated.div
        className={styles.media}
        style={{
          transform: yr.interpolate(
            (y, r) => `translate3d(0,${y}%,0) rotate(${r}deg)`
          ),
          opacity,
        }}
      >
        <Img fluid={profile} alt="A photo of me!" />
      </animated.div>
      <div className={styles.content}>
        <h1 style={{ margin: `0 0 ${rhythm(1)}` }}>
          <Animate toggle={toggle}>Hi I'm Connor</Animate>
        </h1>
        <animated.div
          style={{
            transform: yr.interpolate(y => `translate3d(0,${y}%,0)`),
            opacity,
          }}
        >
          <p>I'm a creative developer living in the south of the UK.</p>
          <p>
            When I'm behind a screen you'll usually find me tinkering with
            something. So far I've had the fortune to work across a wide
            spectrum of projects, covering not only websites but also a broader
            range of apps for mobile, web, and desktop platforms.
          </p>
          <p>
            My current goal is to bring to life things that people enjoy using,
            ideally something that makes people smile and want to show their friends.
          </p>
          <p>
            Outside of work you're likely to find me travelling with my camera,{' '}
            <i>in fact</i> you'll most likely find me in search of food. You're
            always welcome to come along.
          </p>
        </animated.div>
      </div>
    </>
  )
}

export default About
