import React from 'react'
import { Link } from 'gatsby'
import { useTrail, animated } from 'react-spring'

import { rhythm } from '../../utils/typography'
import { TRANSITION_DELAY_IN_MS } from '../Link'
import Raise from '../Raise'
import Article from '../Article'

const Lab = ({ transition, posts }) => {
  const [toggle, set] = React.useState(true)
  const trail = useTrail(posts.length, {
    config: {
      duration: TRANSITION_DELAY_IN_MS,
    },
    yr: toggle ? [0, 0] : [-5, -2],
    opacity: toggle ? 1 : 0,
    from: { yr: [5, 2], opacity: 0 },
  })
  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])

  return (trail.map(({ yr, opacity, ...rest }, index) => (
      <Article
        key={index}
        style={{
          transform: yr.interpolate(
            (y, r) => `translate3d(0,${y}%,0) rotate(${r}deg)`
          ),
          opacity,
          ...rest
        }}
        {...posts[index]}
      />
    ))
  )
}

export default Lab
