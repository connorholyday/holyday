import React from 'react'
import { Link } from 'gatsby'
import { useTrail, animated } from 'react-spring'

import { rhythm } from '../../utils/typography'
import { TRANSITION_DELAY_IN_MS } from '../Link'

const Blog = ({ transition, posts }) => {
  const [toggle, set] = React.useState(true)
  const trail = useTrail(posts.length, {
    config: {
      duration: TRANSITION_DELAY_IN_MS,
    },
    opacity: toggle ? 1 : 0,
    y: toggle ? 0 : -20,
    from: { opacity: 0, y: 20, },
  })
  React.useEffect(() => {
    if (transition === 'exiting') {
      set(false)
    }
  }, [transition])
  return (
    <div style={{ gridColumn: '2/6' }}>
      {trail.map(({ y, ...rest }, index) => {
        const { node } = posts[index]
        const title = node.frontmatter.title || node.fields.slug
        return (
          <animated.div
            key={node.fields.slug}
            style={{
              ...rest,
              transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
              marginBottom: rhythm(1 / 4),
            }}
          >
            <h2
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                {title}
              </Link>
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
      })}
    </div>
  )
}

//   {posts.map(({ node }) => {
//     const title = node.frontmatter.title || node.fields.slug
//     return (
//       <div key={node.fields.slug}>
//         <h2
//           style={{
//             marginBottom: rhythm(1 / 4),
//           }}
//         >
//           <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
//             {title}
//           </Link>
//         </h2>
//         <small
//           style={{
//             display: 'block',
//             marginBottom: rhythm(1 / 4),
//           }}
//         >
//           {node.frontmatter.date}
//         </small>
//         <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
//       </div>
//     )
//   })}

export default Blog
