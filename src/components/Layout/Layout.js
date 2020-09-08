import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { rhythm, scale } from '../../utils/typography'
import { TransitionLink as NavLink } from '../Link'
import styles from './Layout.module.css'

function Layout({ location, inverse, children }) {
  return (
    <StaticQuery
      query={layoutQuery}
      render={data => {
        const { title, social } = data.site.siteMetadata
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
              gridTemplateRows: 'auto 1fr auto',
              gridGap: rhythm(1),
              overflowX: 'hidden',
              minHeight: '100vh',
            }}
          >
            <header className={styles.header}>
              <h2 className={styles.logo}>
                <NavLink
                  style={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: inverse ? 'white' : `inherit`,
                  }}
                  to={`/`}
                >
                  {title}
                </NavLink>
              </h2>
              <nav>
                <ul className={styles.nav}>
                  <li
                    className={styles.navItem}
                    style={{
                      color: inverse ? 'white' : `inherit`,
                    }}
                  >
                    <NavLink to={`/about`}>About</NavLink>
                  </li>
                  <li
                    className={styles.navItem}
                    style={{
                      color: inverse ? 'white' : `inherit`,
                    }}
                  >
                    <NavLink to={`/blog`}>Blog</NavLink>
                  </li>
                  <li
                    className={styles.navItem}
                    style={{
                      color: inverse ? 'white' : `inherit`,
                    }}
                  >
                    <NavLink to={`/lab`}>Lab</NavLink>
                  </li>
                </ul>
              </nav>
            </header>
            {children}
            <footer
              style={{
                display: 'flex',
                marginTop: rhythm(1.5),
                padding: `${rhythm(1.5)} 0`,
                gridColumn: '2/12',
                color: inverse ? 'white' : `inherit`,
                zIndex: 2,
              }}
            >
              <p style={{ margin: 0, marginRight: 'auto' }}>
                &copy; {new Date().getFullYear()}
              </p>
              <a
                style={{
                  color: inverse ? 'white' : `#286CCD`,
                }}
                href={`https://twitter.com/${social.twitter}`}
              >
                twitter
              </a>{' '}
              ﹒{' '}
              <a
                style={{
                  color: inverse ? 'white' : `#286CCD`,
                }}
                href={`https://github.com/${social.github}`}
              >
                github
              </a>{' '}
              ﹒{' '}
              <a
                style={{
                  color: inverse ? 'white' : `#286CCD`,
                }}
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                rss
              </a>
            </footer>
          </div>
        )
      }}
    />
  )
}

const layoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        social {
          twitter
          github
        }
      }
    }
  }
`

export default Layout
