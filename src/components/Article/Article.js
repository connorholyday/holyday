import React from 'react'
import Img from 'gatsby-image'
import { animated } from 'react-spring'
import { useInView } from 'react-intersection-observer';

import Raise from '../Raise'
import styles from './Article.module.css'
import { ExternalLink, InternalLink } from '../Link'

const Title = ({ title, toggle }) => {
  const chars = title.split('')
  return (
    <h2 className={styles.caseStudy__title} aria-label={title}>
      {chars.map((c, i) => (
        <Raise key={i} length={chars.length} index={i} toggle={toggle}>
          {c}
        </Raise>
      ))}
    </h2>
  )
}

function Article({ link, title, tag, image, video, loading, style }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
    skip: !video,
  });
  const [toggle, set] = React.useState(false)
  const Link = link.startsWith('/') ? InternalLink : ExternalLink
  
  return (
    <animated.article ref={ref} className={styles.caseStudy} style={{ ...style }}>
      <Link
        onMouseEnter={() => set(true)}
        onMouseLeave={() => set(false)}
        className={styles.caseStudy__link}
        to={link}
      >
        {title && (<Title title={title} toggle={toggle} tag={tag} />)}
        <div className={styles.caseStudy__media}>
          {video ? (
            <video
              className={styles.caseStudy__video}
              autoPlay
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              poster={loading}
            >
              {inView && (<source src={video} type="video/mp4"></source>)}
            </video>
          ) : (
            <Img fluid={image} alt="" />
          )}
        </div>
      </Link>
    </animated.article>
  )
}

export default Article
