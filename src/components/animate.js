import React from 'react'
import { useSpring, animated } from 'react-spring'
import { ExternalLink } from './Link'
import { TRANSITION_DELAY_IN_MS } from './constants'

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

function Animate({ children, toggle, delay }) {
  const chars = children.split('')

  return (
    <span aria-label={children} style={{ display: 'block', overflow: 'hidden' }}>
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
    </span>
  )
}

export default Animate
