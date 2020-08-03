import React from 'react'
import { animated } from 'react-spring'

import { rhythm } from '../../utils/typography'
import Raise from '../Raise'
import styles from './Article.module.css'
import { ExternalLink, InternalLink } from '../Link'

function Article({ link, title, tag, image, style }) {
  const [toggle, set] = React.useState(false)
  const Link = link.startsWith('/') ? InternalLink : ExternalLink
  const chars = title.split('')
  return (
    <animated.article className={styles.caseStudy} style={{ marginTop: rhythm(4), ...style }}>
      <Link
        onMouseEnter={() => set(true)}
        onMouseLeave={() => set(false)}
        className={styles.caseStudy__link}
        to={link}
      >
        <h2 className={styles.caseStudy__title} aria-label={title}>
          {chars.map((c, i) => (
            <Raise key={i} length={chars.length} index={i} toggle={toggle}>
              {c}
            </Raise>
          ))}
        </h2>
        <div className={styles.caseStudy__media}>
          {tag ? <p className={styles.caseStudy__tag}>{tag}</p> : null}
          <div
            style={{
              background: '#eee',
              width: '100%',
              paddingBottom: '100%',
            }}
          ></div>
        </div>
      </Link>
    </animated.article>
  )
}

export default Article
