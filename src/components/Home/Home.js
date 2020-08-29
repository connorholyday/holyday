import React from 'react'
import { Link } from 'gatsby'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-with-gesture'

import { rhythm } from '../../utils/typography'
import Arc from '../Arc'
import Article from '../Article'
import Raise from '../Raise'
import styles from './Home.module.css'
import { ExternalLink } from '../Link'
import Sketch from '../feature/sketch'
import Animate from '../animate'
import { TRANSITION_DELAY_IN_MS } from '../constants'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'

// window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

const arcHeight = 50

function clamp(number, lower, upper) {
  number = +number
  lower = +lower
  upper = +upper
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
}

function FromTheLab() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0], immediate: prefersReducedMotion, }))
  const bind = useGesture(({ down, delta, velocity }) => {
    velocity = clamp(velocity, 1, 8)
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 750 * velocity, friction: 40 },
    })
  })
  return (
    <animated.div
      {...bind()}
      className={styles.arc}
      style={{
        transform: xy.interpolate(
          (x, y) => `translate3d(${x}px,${y - arcHeight}px,0)`
        ),
      }}
    >
      <Arc radius={arcHeight}>From the lab</Arc>
    </animated.div>
  )
}

const data = [
  {
      slug: "facebook-connectivity",
      link: "https://connectivity.fb.com/",
      title: "Facebook Connectivity",
      tag: "Website",
  },
  {
      slug: "blue-lagoon",
      link: "https://www.bluelagoon.com/",
      title: "Blue Lagoon",
      tag: "Website",
  },
  {
      slug: "nova",
      link: "https://www.nova.is/dansgolfid/appid",
      title: "Nova",
      tag: "App",
  },
  {
      slug: "ileditor2",
      link: "https://ileditor.dev/",
      title: "ILEditor 2",
      tag: "Website + Desktop App",
  },
  {
      slug: "dry-january",
      link: "https://alcoholchange.org.uk/get-involved/campaigns/dry-january/get-involved/the-dry-january-app",
      title: "Dry January",
      tag: "App",
  },
  {
      slug: "yay" ,
      link: "https://www.yay.is/",
      title: "YAY",
      tag: "App",
  },
  {
      slug: "hopp-app" ,
      link: "https://hopp.bike/",
      title: "Hopp",
      tag: "App + Website",
  },
]

const Home = ({ transition, images, social = {} }) => {
  const { twitter = '', github = '' } = social
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
      <div className={styles.content}>
        <div className={styles.centered}>
          <h1 style={{ margin: `0 0 ${rhythm(1)}` }}>
            <Animate toggle={toggle}>Hi I'm Connor</Animate>
          </h1>
          <p style={{ margin: 0 }}>
            <Animate toggle={toggle} delay={10}>
              Creative Developer
            </Animate>
          </p>
          <p>
            <Animate toggle={toggle} delay={20}>
              Attempting to spark joy on the internet
            </Animate>
          </p>
          <div
            style={{
              display: 'flex',
            }}
          >
            <a href={`https://twitter.com/${twitter}`}>
              <Animate toggle={toggle}>twitter</Animate>
            </a>{' '}
            ﹒{' '}
            <a href={`https://github.com/${github}`}>
              <Animate toggle={toggle} delay={7}>
                github
              </Animate>
            </a>
          </div>
        </div>
      </div>
      <animated.div
        className={styles.media}
        style={{
          transform: yr.interpolate(
            (y, r) => `translate3d(0,${y}%,0) rotate(${r}deg)`
          ),
          opacity,
        }}
      >
        <FromTheLab />
        <div
          style={{
            position: 'relative',
            background: '#eee',
            width: '100%',
            paddingBottom: '100%',
            cursor: 'move',
          }}
        >
          <Sketch />
        </div>
      </animated.div>
      {data.map(item => (
        <Article
          key={item.slug}
          link={item.link}
          title={item.title}
          tag={item.tag}
          image={images.get(item.slug)}
        />
      ))}
    </>
  )
}

export default Home
