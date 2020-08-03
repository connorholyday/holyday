import React from 'react'
import { useSpring, animated } from 'react-spring'

function Raise({ children, length, index, toggle }) {
    const { y } = useSpring({
      delay: (100 / length) * (index * 2),
      y: toggle ? -30 : 0,
      from: { y: 0 },
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

  export default Raise