import React from 'react'
import { useSpring, useTrail, animated } from 'react-spring'

import { rhythm } from '../../utils/typography'
import { TransitionLink } from '../Link'
import Raise from '../Raise'
import Animate from '../animate'
import { TRANSITION_DELAY_IN_MS } from '../constants'
import { usePrefersReducedMotion } from '../../utils/usePrefersReducedMotion'
import styles from './Blog.module.css'

const Post = ({ y, node, ...props }) => {
  const [toggle, set] = React.useState(false)
  const title = node.frontmatter.title || node.fields.slug
  const chars = title.split('')
  return (
    <animated.div
      key={node.fields.slug}
      className={styles.post}
      style={{
        ...props,
        transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
        marginBottom: rhythm(1 / 4),
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: rhythm(1 / 4),
        }}
        aria-label={title}
      >
        <TransitionLink
          style={{ boxShadow: `none` }}
          to={node.fields.slug}
          onMouseEnter={() => set(true)}
          onMouseLeave={() => set(false)}
        >
          {chars.map((c, i) => (
            <Raise key={i} length={chars.length} index={i} toggle={toggle}>
              {c}
            </Raise>
          ))}
        </TransitionLink>
      </h2>
      <small
        style={{
          display: 'block',
          marginBottom: rhythm(1 / 4),
        }}
      >
        {node.frontmatter.date}
      </small>
      <p>{node.excerpt}</p>
    </animated.div>
  )
}

const Blog = ({ transition, posts }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [toggle, set] = React.useState(true)
  const { y, opacity } = useSpring({
    delay: TRANSITION_DELAY_IN_MS + 0.3,
    y: toggle ? 0 : -5,
    opacity: toggle ? 1 : 0,
    from: { y: 5, opacity: 0 },
    immediate: prefersReducedMotion,
  })
  const trail = useTrail(posts.length, {
    config: {
      duration: TRANSITION_DELAY_IN_MS,
    },
    opacity: toggle ? 1 : 0,
    y: toggle ? 0 : -20,
    from: { opacity: 0, y: 20 },
    immediate: prefersReducedMotion,
  })
  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])
  return (
    <div className={styles.content}>
      <h1 style={{ margin: `0 0 ${rhythm(1)}` }}>
        <Animate toggle={toggle}>Welcome to the Blog</Animate>
      </h1>
      <animated.p style={{
          transform: y.interpolate(y => `translate3d(0,${y}%,0)`),
          opacity,
          marginBottom: '4rem'
      }}>Mostly ramblings on WebGL with maybe some React, TypeScript, and CSS thrown in for good measure.</animated.p>
      {trail.map(({ y, ...rest }, index) => (
        <Post key={index} y={y} node={posts[index].node} {...rest} />
      ))}
    </div>
  )
}

export default Blog
