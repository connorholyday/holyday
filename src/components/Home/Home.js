import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-with-gesture'

import { rhythm } from '../../utils/typography'
import Arc from '../Arc'
import styles from './Home.module.css'
import { TRANSITION_DELAY_IN_MS } from '../Layout'

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
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  const bind = useGesture(({ down, delta, velocity }) => {
    velocity = clamp(velocity, 1, 8)
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 100 * velocity, friction: 50 },
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

const Trail = ({ children, delay = 0, length, index, toggle, ...props }) => {
  const { y } = useSpring({
    // delay: delay + (TRANSITION_DELAY_IN_MS / length) * index,
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

const Home = ({ transition, social = {} }) => {
  const { twitter = '', github = '' } = social
  const [toggle, set] = React.useState(true)
  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])
  const { yr, opacity } = useSpring({
    // delay: delay + (TRANSITION_DELAY_IN_MS / length) * index,
    delay: TRANSITION_DELAY_IN_MS + 0.3,
    yr: toggle ? [0, 0] : [-5, -2],
    opacity: toggle ? 1 : 0,
    from: { yr: [5, 2], opacity: 0 },
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
              A creative developer
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
            background: '#eee',
            width: '100%',
            paddingBottom: '100%',
          }}
        ></div>
      </animated.div>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
        <h2 className={styles.caseStudy__title}>Facebook Connectivity</h2>
        <div className={styles.caseStudy__media}>
          <p className={styles.caseStudy__tag}>Website</p>
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
        <h2 className={styles.caseStudy__title}>Blue Lagoon</h2>
        <div className={styles.caseStudy__media}>
          <p className={styles.caseStudy__tag}>Website</p>
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
        <h2 className={styles.caseStudy__title}>Nova</h2>
        <div className={styles.caseStudy__media}>
          <p className={styles.caseStudy__tag}>App</p>
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
        <h2 className={styles.caseStudy__title}>ILEditor 2</h2>
        <div className={styles.caseStudy__media}>
          <p className={styles.caseStudy__tag}>Desktop App</p>
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
        <h2 className={styles.caseStudy__title}>Dry January</h2>
        <div className={styles.caseStudy__media}>
          <p className={styles.caseStudy__tag}>App</p>
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
        <h2 className={styles.caseStudy__title}>YAY</h2>
        <div className={styles.caseStudy__media}>
          <p className={styles.caseStudy__tag}>App</p>
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
        <h2 className={styles.caseStudy__title}>Hopp</h2>
        <div className={styles.caseStudy__media}>
          <p className={styles.caseStudy__tag}>App + Website</p>
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </article>
      <article className={styles.caseStudy} style={{ marginTop: rhythm(4) }}>
        <h2 className={styles.caseStudy__title}>Hrósarinn</h2>
        <div className={styles.caseStudy__media}>
          <p className={styles.caseStudy__tag}>Website</p>
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </article>
    </>
  )
}

export default Home
