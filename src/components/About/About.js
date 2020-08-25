import React from 'react'
import { Link } from 'gatsby'
import { useSpring, animated } from 'react-spring'

import { rhythm } from '../../utils/typography'
import styles from './About.module.css'
import { TRANSITION_DELAY_IN_MS, ExternalLink } from '../Link'
import profile from './images/profile.jpg'

const Trail = ({ children, delay = 0, length, index, toggle }) => {
  const { y } = useSpring({
    delay: (TRANSITION_DELAY_IN_MS / (length + delay)) * (index + delay),
    y: toggle ? 0 : -100,
    from: { y: 100 },
  })
  return (
    <animated.span
      key={index}
      style={{
        display: 'inline-block',
        whiteSpace: 'pre',
        transform: y.interpolate(y => `translate3d(0,${y}%,0)`),
      }}
      aria-hidden="true"
    >
      {children}
    </animated.span>
  )
}

export function Animate({ children, toggle, delay }) {
  const chars = children.split('')

  return (
    <div aria-label={children} style={{ overflow: 'hidden' }}>
      {chars.map((char, index) => (
        <Trail
          key={index}
          length={chars.length}
          index={index}
          toggle={toggle}
          delay={delay}
        >
          {char}
        </Trail>
      ))}
    </div>
  )
}

const About = ({ transition, social = {} }) => {
  const { twitter = '', github = '' } = social
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
        <div
          style={{
            position: 'relative',
            background: '#eee',
            width: '100%',
            paddingBottom: '100%',
            backgroundImage: `url(${profile})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-role="image"
          alt="A photo of me!"
        >
        </div>
      </animated.div>
      <div className={styles.content}>
        <h1 style={{ margin: `0 0 ${rhythm(1)}` }}>
          <Animate toggle={toggle}>Hi I'm Connor</Animate>
        </h1>
        <p>
          I'm a creative developer living in the south of the UK.
        </p>
        <p>
          When I'm behind a screen you'll usually find me tinkering with something. So far I've had the fortune to work across a wide spectrum of projects, covering not only websites but also a broader spectrum of apps for mobile, web, and desktop platforms.
        </p>
        <p>
          My current goal is to improve on bringing a sense of natural interaction to my work, and to delightfully surprise people with the little details.
        </p>
        <p>Outside of work you're likely to find me travelling with my camera, in fact you'll <i>most</i> likely find me in search of food. You're always welcome to join me.</p>
      </div>
    </>
  )
}

export default About
