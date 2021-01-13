import React from 'react'
import Img from 'gatsby-image'
import { animated } from 'react-spring'

import Raise from '../Raise'
import styles from './Article.module.css'
import { ExternalLink, InternalLink } from '../Link'

function Article({ link, title, tag, image, style }) {
  const [toggle, set] = React.useState(false)
  const Link = link.startsWith('/') ? InternalLink : ExternalLink
  const chars = title.split('')
  return (
    <animated.article className={styles.caseStudy} style={{ ...style }}>
      <Link
        onMouseEnter={() => set(true)}
        onMouseLeave={() => set(false)}
        className={styles.caseStudy__link}
        to={link}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <h2 className={styles.caseStudy__title} aria-label={title}>
            {chars.map((c, i) => (
              <Raise key={i} length={chars.length} index={i} toggle={toggle}>
                {c}
              </Raise>
            ))}
          </h2>
          {tag ? <p className={styles.caseStudy__tag}>- {tag}</p> : null}
        </div>
        <div className={styles.caseStudy__media}>
          <Img fluid={image} alt="" />
        </div>
      </Link>
    </animated.article>
  )
}

export default Article
