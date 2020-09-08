import React from 'react'
import { useSpring, animated } from 'react-spring'
import { ExternalLink } from './Link'
import { TRANSITION_DELAY_IN_MS } from './constants'
import { usePrefersReducedMotion } from '../utils/usePrefersReducedMotion'

const Trail = ({ children, delay = 0, length, index, toggle }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { y } = useSpring({
    delay: (TRANSITION_DELAY_IN_MS / (length + delay)) * (index + delay),
    y: toggle ? 0 : -100,
    from: { y: 100 },
    immediate: prefersReducedMotion,
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
  const count = React.useRef(0);
  const words = children.split(' ')
  const characters = children.split('').filter(char => char !== ' ');

  React.useEffect(() => {
    count.current = 0; 
  })
  
  return (
    <span aria-label={children} style={{ display: 'block', overflow: 'hidden' }}>
      {words.map((word, wordIndex) => {
        const chars = word.split('')
        return (
          <span key={wordIndex} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.24em' }}>
            {chars.map((char, index) => (
              <Trail
                key={`${wordIndex}${index}${count.current}`}
                length={characters.length}
                index={count.current++}
                toggle={toggle}
                delay={delay}
              >
                {char}
              </Trail>
            ))}
          </span>
        )
      })}
    </span>
  )
}

export default Animate
